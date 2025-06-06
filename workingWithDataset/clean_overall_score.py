# Очистка столбца overall_score

import pandas as pd
import numpy as np

def clean_overall_score(score):
    if pd.isna(score): # Если это пропущенное значение, вернуть его как NaN
        return np.nan

    score = str(score).strip()  # Преобразование в строку и удаление пробелов

    if '–' in score:
        try:
            parts = score.split('–')
            if len(parts) == 2:
                start = float(parts[0])
                end = float(parts[1])
                return (start + end) / 2  # Вычисляем среднее арифметическое
            else:
                return np.nan
        except ValueError:
            return np.nan

    try:
        return float(score)
    except ValueError:
        return np.nan
    
df = pd.read_csv('World_University_Rankings.csv',
                    sep=',',
                    decimal='.',
                    encoding='utf-8',
                    quotechar='"',
                    skipinitialspace=True,
                    names=[ 'name', 'scores_teaching', 'scores_research', 'scores_citations',
                            'scores_industry_income', 'scores_international_outlook', 'record_type',
                            'member_level', 'location', 'stats_number_students', 'stats_student_staff_ratio',
                            'stats_pc_intl_students', 'stats_female_male_ratio', 'subjects_offered',
                            'closed', 'unaccredited', 'overall_score'])

df['overall_score'] = df['overall_score'].apply(clean_overall_score)
print(df['overall_score'].unique())
df.to_csv('World_University_Rankings_cleaned2.csv', index=False, encoding='utf-8')