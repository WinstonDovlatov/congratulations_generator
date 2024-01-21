import React, { useEffect, useState } from "react";
import { Button, Card, Text, ChipsInput, FormItem, FormLayout, FormLayoutGroup, Group, Header, Input, Panel, PanelHeader, PanelHeaderBack, Select, Spacing } from "@vkontakte/vkui";
import bridge from '@vkontakte/vk-bridge';

import '@vkontakte/vkui/dist/vkui.css';
import BottomButton from "../BottomButton";
import { Steps, UserInfoModel } from "../model";

const UserInfo = ({ id, go, setUserInfo }: {id: string, go: (id: string) => void, setUserInfo: (info: UserInfoModel) => void}) => {
    const [canSend, setCanSend] = useState<boolean | null>(null);
    const [userId, setUserId] = useState<number | null>(null);
    const [hobbies, setHobbies] = useState([]);
    const [hobbiesChips, setHobbiesChips] = useState([]);
    const [age, setAge] = useState<number>();
    const [name, setName] = useState<string>("");
    const [sexLabel, setSexLabel] = useState<"Мужской" | "Женский">("Мужской");
    const [sex, setSex] = useState<"M" | "F">("M");
    const [disabledBtn, setDisabledBtn] = useState(true);

    const getFriend = async () => {
        const friendsResult = await bridge.send('VKWebAppGetFriends', {multi: false})

        const [friend] = friendsResult.users;

        const userId = friend.id;

        const friendInfo = await bridge.send('VKWebAppGetUserInfo', {
            user_id: userId
        });

        if((friendInfo as any).is_closed) {
            setCanSend(false);

            setDisabledBtn(true);

            return;
        }

        setUserId(friendInfo.id);

        setCanSend(true);

        setName(friendInfo.first_name);

        if ([1, 2].includes(friendInfo.sex)) {
            setSex(friendInfo.sex === 1 ? 'M' : 'F');
        }
    }

    const nextStep = () => {
        go(Steps.GENERATION);
    }

    useEffect(() => {
        setUserInfo({
            id: userId!,
            hobbies: hobbies ?? [],
            age: age!,
            sex: sex!,
            name,
        });

        setDisabledBtn(!(!!userId && sex && name));

    }, [userId, sex, age, hobbies, name])

    return <Panel id={id}>
        <PanelHeader
            before={<PanelHeaderBack onClick={() => go(Steps.CHARACTER)}/>}
        >
            Кому отправить поздравление
        </PanelHeader>

        <Group header={<Header mode="secondary">Выбери пользователя</Header>} style={{padding: 16}}>

            <div style={{padding: 12,  display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                <Text style={{marginBottom: 16}} weight="2">Выбери пользователя, которому хочешь отправить поздравление. Учти, что у него должен быть открытый профиль и личные сообщения для всех пользователей</Text>

                <Spacing size={16} />

                {name && <Text style={{marginBottom: 16}}>Получатель: {name}</Text>}

                <Button mode="primary" align="center" size="m" appearance="accent" onClick={() => getFriend()}>Выбрать получателя</Button>
            </div>

            <Card style={{marginBottom: 16}}>
                {userId && <div>
                    <FormLayout>
                        <FormLayoutGroup mode="vertical">
                            <FormItem htmlFor="name" top="Укажите имя получателя">
                                <Input required value={name} onChange={(e) => setName(e.target.value)} id="name" type="text" placeholder="Имя (или псевдоним)" />
                            </FormItem>

                            <FormItem htmlFor="age" top="Укажите возраст получателя">
                                <Input required onChange={(e) => setAge(parseInt(e.target.value ?? '0'))} id="age" type="number" placeholder="Возраст" />
                            </FormItem>

                            <FormItem top="Пол" htmlFor="gender-select-id">
                                <Select
                                    required
                                    id="gender-select-id"
                                    placeholder="Выберите пол"
                                    onChange={(e) => {setSex(e.target.value as "M" | "F" ); setSexLabel(e.target.value)}}
                                    value={sexLabel}
                                    options={[
                                    {
                                        value: 'M',
                                        label: 'Мужской',
                                    },
                                    {
                                        value: 'F',
                                        label: 'Женский',
                                    },
                                    ]}
                                />
                            </FormItem>

                            <FormItem htmlFor="hobbies" top="Укажите интересы получателя">
                                <ChipsInput
                                    id="hobbies"
                                    value={hobbiesChips}
                                    onChange={(e) => setHobbies([...e.map(({value}) => value)])}
                                />
                            </FormItem>

                        </FormLayoutGroup>
                    </FormLayout>
                </div>}
            </Card>
        </Group>

        <BottomButton disabled={disabledBtn} text="Сгенерировать поздравление" go={() => nextStep()}></BottomButton>
    </Panel>
}

export default UserInfo;