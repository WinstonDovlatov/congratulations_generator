import vk_requests

def send_vk_msg(character_id: 'str', user_id: 'str', text: 'str'):
    token_liza = 'YOUR TOKEN'
    token_drakula = 'YOUR TOKEN'
    token_elf = 'YOUR TOKEN'
    token_ded = 'YOUR TOKEN'
    token_wolf = 'YOUR TOKEN'

    char_to_token = {
        'liza': token_liza,
        'elf': token_elf,
        'drak': token_drakula,
        'ded': token_ded,
        'wolf': token_wolf
    }
    try:
        token = char_to_token[character_id]
    except:
        print("Invalid character_id")
        return (-1, "Invalid character_id")

    try:
        vk_api = vk_requests.create_api(service_token=token)
    except:
        print("Failed to login")
        return (-1, 'Failed to login')

    try:
        vk_api.messages.send(user_id=user_id, random_id=0, message=text)
    except:
        print("Failed to send msg")
        return (-1, 'Failed to send msg')

    return (0, 'OK')
