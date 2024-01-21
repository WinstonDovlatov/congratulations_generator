from typing import List
from prompts import generate_liza, generate_ded, generate_elf, generate_wolf, generate_drak

hd_id_to_holiday = {
    'BD': "Днем Рождения",
    'NY': "Новым Годом"
}

who_is_by_sex = {
    'M': "который",
    'F': "которая"
}

char_to_prompt_func = {
    'liza': generate_liza,
    'elf': generate_elf,
    'drak': generate_drak,
    'ded': generate_ded,
    'wolf': generate_wolf
}


def generate_prompt(character_id, name, holiday_id, hobby, sex='M'):
    holiday = hd_id_to_holiday[holiday_id]
    user_description = get_user_description(name=name, hobby=hobby, sex=sex)
    prompt_func = char_to_prompt_func[character_id]
    return prompt_func(holiday=holiday, user_description=user_description)


def get_interesting_in(hobby: List) -> str:
    if len(hobby) == 0:
        return ''
    elif len(hobby) == 1:
        return f'увлекается {hobby[0]}'
    else:
        return f'увлекается {hobby[0]} и {hobby[1]}'


def get_user_description(name: str, hobby: List, sex: str = 'M'):
    who_is = ', ' + who_is_by_sex[sex] if len(hobby) else ''
    interesting_in = get_interesting_in(hobby)
    return f"{name} {who_is} {interesting_in}".strip()
