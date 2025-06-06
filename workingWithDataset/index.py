# Перевод датасета в базу данных postgres

import pandas as pd
from sqlalchemy import create_engine, exc
from sqlalchemy.types import * 

def write_dataframe_to_postgres(df, db_name, db_user, db_password, db_host, db_port, table_name, if_exists='replace', schema=None):
    try:
        # Определите типы данных SQLAlchemy на основе DataFrame
        dtype_mapping = {
            'name': Text, 
            'scores_teaching': Float,
            'scores_research': Float,
            'scores_citations': Float,
            'scores_industry_income': Float,
            'scores_international_outlook': Float,
            'record_type': String(50), 
            'member_level': Integer,
            'location': String(100),
            'stats_number_students': String(20),  
            'stats_student_staff_ratio': Float,
            'stats_pc_intl_students': String(20), 
            'stats_female_male_ratio': String(20), 
            'subjects_offered': Text,  
            'closed': Boolean,
            'unaccredited': Boolean,
            'overall_score': Float
        }

        # Создаем Engine SQLAlchemy
        engine = create_engine(f'postgresql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}',
                                        isolation_level='AUTOCOMMIT')

        # Записываем DataFrame в PostgreSQL, используя SQLAlchemy и определенные типы данных
        df.to_sql(table_name, engine, if_exists=if_exists, index=False, dtype=dtype_mapping, schema=schema)
        print(f"DataFrame успешно записан в таблицу '{table_name}' базы данных PostgreSQL.")


    except exc.SQLAlchemyError as e:
        print(f"Ошибка при записи в PostgreSQL (SQLAlchemy): {e}")
        if hasattr(e, 'orig'):
            print(f"Оригинальная ошибка базы данных: {e.orig}")


    except Exception as e:
        print(f"Общая ошибка: {e}")


if __name__ == '__main__':
    db_name = "WorldUniversityRankings"
    db_user = "postgres"
    db_password = "178320970228"
    db_host = "localhost"
    db_port = "5432"
    table_name = "university_rankings"
    schema_name = "public" 

    try:
        df = pd.read_csv('World_University_Rankings_cleaned.csv',
                           sep=',',  
                           decimal='.',
                           encoding='utf-8',
                           quotechar='"',
                           skipinitialspace=True)

        # Очистка данных:
        def clean_numeric_string(x):
            if isinstance(x, str):
                x = x.replace('"', '').replace(',', '')
                try:
                    return float(x)
                except ValueError:
                    return None
            return x

        # Применяем функцию к столбцам, которые должны быть числовыми
        numeric_columns = ['scores_teaching', 'scores_research', 'scores_citations', 'scores_industry_income', 'scores_international_outlook', 'overall_score']
        for col in numeric_columns:
            df[col] = df[col].apply(clean_numeric_string).astype(float)

        # Очистка столбца stats_number_students (Удаляем кавычки и запятые)
        df['stats_number_students'] = df['stats_number_students'].astype(str).str.replace('"', '').str.replace(',', '').astype(str)

        # Очистка stats_pc_intl_students (Удаляем символ процента)
        df['stats_pc_intl_students'] = df['stats_pc_intl_students'].astype(str).str.replace('%', '').astype(str)

        df = df.fillna(0)  # Заменить NaN на 0 (или другое подходящее значение)

        # Преобразование boolean столбцов (обрабатываем кириллицу и латиницу)
        df['closed'] = df['closed'].replace({'Ложь': False, 'False': False}).astype(bool)
        df['unaccredited'] = df['unaccredited'].replace({'Ложь': False, 'False': False}).astype(bool)

        # Запись DataFrame в PostgreSQL
        write_dataframe_to_postgres(df, db_name, db_user, db_password, db_host, db_port, table_name, if_exists='replace', schema=schema_name)

    except FileNotFoundError:
        print("Файл 'WorldUniversityRankings.csv' не найден.")
    except Exception as e:
        print(f"Ошибка при чтении или обработке CSV: {e}")


   