import React, { useEffect, useState } from "react";
import { Button, Card, FixedLayout, Panel, PanelHeader, PanelHeaderBack, PanelSpinner, Text } from "@vkontakte/vkui";
import '@vkontakte/vkui/dist/vkui.css';
import { Steps, UserInfoModel } from "../model";
import bridge from "@vkontakte/vk-bridge";

const GenerationResult = ({ id, go, characterId, userInfo }: {characterId: string, userInfo: UserInfoModel, id: string, go: (id: string) => void}) => {
    const [result, setResult] = useState<{text: string, id: string} | null>(null);
    const [userId, setUserId] = useState<number>(1);

    const generate = async () => {
        setLoading(true);

        try {
            const resp = await fetch('https://vz22gy-ip-109-252-150-9.tunnelmole.net', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams([
                    ["character_id", characterId],
                    ["name", userInfo.name],
                    ["sex", 'M'],
                    ...userInfo.hobbies.map(hobby => ["hobbies", hobby]),
                ]),
            });


            const resultData = await resp.text();
            setResult({text: resultData, id: ''});

            setLoading(false);
        } catch (e) {
            console.error(e);
        }
    };

    const confirm = async () => {
        setLoading(true);

        await fetch('https://5yxaxd-ip-109-252-150-9.tunnelmole.net', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                id_from: userId.toString(),
                user_id: userInfo.id.toString(),
                character_id: characterId,
                text: result!.text
            }),
        });

        go(Steps.FINAL);
    };

    const getUserId = async () => {
        const userInfo = await bridge.send('VKWebAppGetUserInfo');

        setUserId(userInfo.id);
    }

    useEffect(() => {
        generate();

        getUserId();
    }, []);

    const [loading, setLoading] = useState(true);

    return <Panel id={id}>
        <PanelHeader
            before={<PanelHeaderBack onClick={() => go("user-info")}/>}
        >
            Предпросмотр поздравления
        </PanelHeader>

        {loading ? (
            <PanelSpinner size="large">поздравление загружается, пожалуйста, подождите...</PanelSpinner>) :
    (
        <div>
            <Card style={{ margin: 20, padding: 16 }}>
                <Text style={{whiteSpace: 'pre-line'}} weight="1">{result?.text}</Text>
            </Card>

            <FixedLayout vertical="bottom" style={{ padding: 20 }}>
                <Button stretched={true} mode="primary" align="center" size="m" appearance="accent" onClick={() => confirm()} style={{marginBottom: 12}}>Отправить</Button>
                <Button stretched={true} mode="secondary" align="center" size="m" appearance="accent" onClick={() => generate()}>Перегенерировать</Button>
            </FixedLayout>
        </div>
    )}
    </Panel>
};

export default GenerationResult;