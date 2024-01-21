import React from 'react';

import { Panel, Spacing, Button, Text, Card, PanelHeader, FixedLayout } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import BottomButton from '../BottomButton';

const introGif = require('../img/intro.gif');

const Intro = ({ id, go }: {id: string, go: (id: string) => void}) => {
    return <Panel id={id}>
        <PanelHeader
		>
			Генератор поздравлений
		</PanelHeader>

        <Card style={{ margin: 20, padding: 16 }}>
            <div>
                <Text weight="1">Привет!
Наше приложение "Герои праздника" поможет вам создать уникальное и креативное поздравление для ваших друзей и близких.
Выберите своего любимого персонажа, и он напишет персонализированное поздравление в своем стиле, учитывая все ваши пожелания.</Text>
                <Spacing size={16} />
                <Text weight="2">Нажмите кнопку "Начать" ниже, чтобы создать поздравление</Text>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <img style={{marginTop: 20}} src={introGif} />
            </div>
        </Card>


        <BottomButton text="Начать" go={() => go('character')}></BottomButton>
    </Panel>
};

export default Intro;