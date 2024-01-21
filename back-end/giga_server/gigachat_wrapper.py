from prompt_generator import generate_prompt
from langchain.schema import HumanMessage, SystemMessage
from langchain.chat_models.gigachat import GigaChat


def generate_congratulation(character_id, name, holiday_id, hobby, sex):
    chat = GigaChat(
        temperature=1.3,
        credentials='YOUR TOKEN',
        verify_ssl_certs=False)

    with open('init_prompt.txt', 'r') as fin:
        init_msg = SystemMessage(content=fin.read().strip())

    prompt = HumanMessage(
        content=generate_prompt(
            character_id=character_id,
            name=name,
            holiday_id=holiday_id,
            hobby=hobby,
            sex=sex
        )
    )

    result = chat([init_msg, prompt])

    return result.content

# {'character_id': 'drak', 'name': 'Глеб', 'holiday_id': 'BD', 'hobby': ['пиво', 'спорт'], 'sex': 'M'}
# print(generate_congratulation('ded', 'Лиза', 'NY', [], 'F'))
