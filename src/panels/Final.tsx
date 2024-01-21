import React from "react"
import { Card, Panel, Text, Spacing, Button } from "@vkontakte/vkui"
import bridge from "@vkontakte/vk-bridge";

import '@vkontakte/vkui/dist/vkui.css';
import { Steps } from "../model";

export const Final = ({id, go}: {id: string, go: (id: string) => void}) => {
    const closeApp = () => {
        bridge.send('VKWebAppClose', {
            status: 'success'})
            .catch((error: any) => {
              console.log(error);
            });
    }

    return <Panel id={id}>
        <Card style={{ margin: 20, padding: 16 }}>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Text weight="1">Супер, поздравление скоро будет отправлено получателю!</Text>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                <img style={{marginTop: 20}} src="https://i.giphy.com/media/1DTBGm5Rfgymk/giphy.webp" />

                <Button style={{marginTop: 16}} stretched={true} mode="primary" align="center" size="m" appearance="accent" onClick={() => go(Steps.CHARACTER)}>Сделать новое поздравление</Button>
                <Button style={{marginTop: 16}} stretched={true} mode="secondary" align="center" size="m" appearance="accent" onClick={() => closeApp()}>Закрыть приложение</Button>
            </div>
        </Card>
    </Panel>
}