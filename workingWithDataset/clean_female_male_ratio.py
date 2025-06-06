# Очистка stats_female_male_ratio

import pandas as pd
import numpy as np

def clean_female_male_ratio(ratio):
    if pd.isna(ratio):
        return np.nan

    if isinstance(ratio, (int, float)):
        return np.nan

    ratio = str(ratio).strip()

    if ':' not in ratio:
        return np.nan

    parts = ratio.split(':')
    try:
        female = int(parts[0])
        male = int(parts[1])
        return f"{female}:{male}"  # Берем только первые две части
    except ValueError:
        return np.nan 

df = pd.read_csv('World_University_Rankings_cleaned.csv',
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


df['stats_female_male_ratio'] = df['stats_female_male_ratio'].apply(clean_female_male_ratio)
print(df['stats_female_male_ratio'].unique())
df.to_csv('World_University_Rankings_cleaned.csv', index=False, encoding='utf-8')
