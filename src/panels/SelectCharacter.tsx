import React, { useEffect, useState } from "react";

import { Avatar, Image, Group, Header, Text, Panel, PanelHeader, PanelHeaderBack, Subhead, Title, HorizontalScroll, HorizontalCell, CardGrid, Headline, Paragraph } from "@vkontakte/vkui";
import BottomButton from "../BottomButton";
import { Steps } from "../model";
import { Icon16CheckCircleLarge } from "@vkontakte/icons";

import '@vkontakte/vkui/dist/vkui.css';

const SelectCharacter = ({ id, go, setCharacterId }: {id: string, go: (id: string) => void, setCharacterId: (id: string) => void}) => {
    const onSelect = (id: string) => {

        setCharacters(characters.map(character => ({
            ...character,
            checked: character.id === id
        })));

        setCharacter(characters.find(character => character.id === id) ?? null);

        setCharacterId(id);
    }

    const [characters, setCharacters] = useState([
        {
            id: 'liza',
            firstName: 'Элизабет Дарк',
            shortDescription: 'Роковая женщина',
            congratExample: `Глеб, мой дорогой, сегодня я хочу поздравить тебя с Днем Рождения и подарить тебе загадочное поздравление, которое раскроет твою истинную сущность.

Ты — мужчина, который всегда стремится к вершинам, но при этом остается загадкой для окружающих. Твоя сила и страсть притягивают, как магнит, и заставляют сердца биться чаще. Ты обладаешь темным влечением, которое не поддается объяснению, и интригуешь своей непредсказуемостью.

Сегодня, в этот особенный день, я желаю тебе открыть новые горизонты и достичь всех своих целей. Пусть каждый твой шаг будет уверенным и направленным к успеху. И пусть твоя жизнь будет наполнена страстью и любовью, как никогда прежде.

С Днем Рождения, Глеб. Будь всегда таким же загадочным и неотразимым.`,
            description: 'Обольстительная роковая дива с магнетической силой. В ее глазах таится тайна, а страстный характер и властный образ заставляют окружающих замирать в восторге и трепете.',
            photo: require('../img/liza.jpeg'),
            checked: true,
        },
        {
            id: 'elf',
            firstName: 'Эллиан Селестиал',
            shortDescription: 'Романтичный эльф',
            description: 'Волшебный романтичный эльф, способный написать утонченное и поэтичное поздравление',
            congratExample: `Дорогая Лиза, в этот день рождения, когда природа пробуждается от зимней спячки, я желаю тебе, чтобы твоя жизнь была наполнена волшебством и радостью, как цветущие лесные тропинки весной.

Пусть каждый твой шаг будет освещен ярким звездным светом, а каждый твой вздох наполнен ароматом нежных цветов.

Ты, как прекрасный эльф, обладаешь изяществом и элегантностью, которые присущи только самым благородным созданиям. Твоя красота и нежность окутывают всех вокруг, словно легкий туман, и приносят восхищение и радость, как шепот ветра в лесу.

Пусть каждый день твоей жизни будет наполнен волшебством и чудесами, как магический лес, где сбываются самые заветные мечты. И пусть твоя душа всегда остается светлой и чистой, как звездное небо в безлунную ночь.

С днем рождения, Лиза, и пусть твоя жизнь будет полна красоты, нежности и волшебства, словно сказочный лес, где ты можешь быть самой собой и наслаждаться каждым мгновением своей удивительной жизни.`,
            photo: require('../img/elf.png'),
            checked: false,
        },
        {
            id: 'drak',
            firstName: 'Ричард Беркроу',
            shortDescription: 'Древний вампир',
            description: 'Потомок древнего рода вампиров, ценитель крови девственниц и чертовски обаятельный мерзавец',
            congratExample: `Дорогой Глеб,

Сегодня твой день рождения, и я, как твой верный слуга, хочу поздравить тебя с этим знаменательным событием. В тебе, как в потомке древнего рода вампиров, заложено величие, которое не может остаться незамеченным. Твоя загадочность и безупречный стиль привлекают внимание, как свет привлекает мотыльков.

Ты, как представитель нашего рода, обязан сохранять его честь и достоинство. Твои темные ночи, полные тайны и обаяния, служат примером для всех нас. Мы, как вампиры, ценим силу и величие, но также и тон уважения и праздничную торжественность.

Пусть этот день будет наполнен радостью и счастьем, как капля крови наполняет сердце во время обряда. Пусть каждый твой шаг будет уверенным и грациозным, как движение вампира в полной темноте. И пусть твоя жизнь будет наполнена загадками и приключениями, как путь нашего рода, простирающийся через века.

С днем рождения, Глеб! Желаю тебе силы, величия и вечности, чтобы ты продолжал быть источником вдохновения и загадочности для всех нас.`,
            photo: require('../img/drak.png'),
            checked: false,
        },
        {
            id: 'ded',
            firstName: 'Дедушка мороз',
            shortDescription: 'Тот самый',
            description: 'В представление не нуждается, символ приближающегося и долгожданного праздника',
            congratExample: `Дорогая Лиза, с Новым годом!

Вот я, твой любимый Дед Мороз, хочу поздравить тебя с этим чудесным праздником. В новом году я желаю тебе столько подарков, сколько у Санты в Рождество. Столько мандаринов, чтобы они падали на голову градом. Столько радости и счастья, чтобы они не помещались в твоём сердце и заставляли его биться чаще.

Я приготовил для тебя особенный подарок. Он будет не хуже тех, что ты получаешь от родителей. Но ты должна хорошо себя вести, чтобы я смог тебе его вручить. Я знаю, что ты у нас девочка умная и воспитанная, поэтому не сомневаюсь, что ты справишься.

В новом году я хочу пожелать тебе много волшебства и чудес. Пусть каждый твой день будет наполнен счастьем и весельем, как будто ты попала в сказку. Пусть все твои мечты сбываются, а желания исполняются.

А теперь, дорогая Лиза, пора мне идти. У меня ещё много дел. Но я обязательно вернусь к тебе в следующем году, чтобы поздравить тебя с Днём рождения.

С Новым годом, с новыми возможностями!`,
            photo: require('../img/ded.png'),
            checked: false,
        },
        {
            id: 'wolf',
            firstName: 'Серега Мудрый',
            shortDescription: 'По-пацански мудрый',
            description: 'Ровный русский пацан. Его цитаты полны мудростью и звучат как героические песнопения',
            congratExample: `С днём рождения, чувак!

Сегодня на год старше стал, на год мудрее, Глеб. В жизни у тебя много перемен, но ты не переживай, всё будет чётко, как тут говорится, по плану. Никогда не сдавайся, будь лидером, берись за дело, и тогда точно будешь на коне. А если что-то не получается, то нужно просто подкрутить гайки, всё наладится.
Желаю тебе найти свою любовь, свою музу, которая будет вдохновлять тебя на новые свершения. И вообще, найди себе классную девчонку, чтобы она поддерживала тебя во всём, понимала и любила.
Ну и, конечно же, много денег, чтобы было на что потратить все заработанные миллионы.

Будь здоров, крепок, силён. Пусть все беды обходят тебя стороной, а если что-то случается, то ты это преодолеваешь. И помни: главное — не сдаваться, тогда точно всё будет хорошо.

С твоим днём!`,
            photo: require('../img/wolf.png'),
            checked: false,
        },
    ]);
    const [character, setCharacter] = useState<{
        id: string;
        firstName: string;
        photo: string;
        checked: boolean;
        description: string;
        congratExample: string;
    }| null>(null);

    useEffect(() => {
        setCharacter(characters[0]);

        setCharacterId(characters[0].id);
    }, [])

    return <Panel id={id}>
        <PanelHeader
			before={<PanelHeaderBack onClick={() => go(Steps.INTRO)}/>}
		>
			Выбери персонажа
		</PanelHeader>
        <Group header={<Header mode="secondary">Выбери персонажа</Header>} style={{padding: 16}}>
            <Text weight="2" style={{marginBottom: 12, padding: 12}}>Выбери одного из представленных персонажей, от лица которого будет поздравление. Каждый из них имеет свой собственный стиль генерации текста</Text>

            <HorizontalScroll>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {characters.map(character => (
                        <HorizontalCell key={character.id} onClick={() => onSelect(character.id)} size="l" header={character.firstName} subtitle={character.shortDescription} >
                            <Avatar size={128} src={character.photo} >
                                {character.checked && <Image.Badge>
                                    <Icon16CheckCircleLarge></Icon16CheckCircleLarge>
                                </Image.Badge>}
                            </Avatar>
                        </HorizontalCell>)
                    )}
                </div>
            </HorizontalScroll>

            <div style={{display: 'flex', paddingBottom: 16, marginTop: 16}}>
                <CardGrid size="m">
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <Image size={200} borderRadius="m" src={character?.photo}></Image>

                            <div style={{marginLeft: 16, display: 'flex', flexDirection: 'column' }}>
                                <Title style={{marginBottom: 12}} level="1">{character?.firstName}</Title>
                                <Headline weight="2" style={{marginBottom: 12}}>{character?.description}</Headline>

                                <Paragraph>Пример поздравления: </Paragraph>

                                <div style={{display: 'flex'}}>
                                    <Paragraph style={{fontStyle: 'italic', opacity: 0.8, whiteSpace: 'pre-line'}}>{character?.congratExample}</Paragraph>
                                </div>
                            </div>
                        </div>
                </CardGrid>
            </div>



            {/* {characters.map(character => {
                return <Cell mode="selectable" onChange={() => onSelect(character.id)} checked={character.checked} before={<Avatar src={character.photo} />}>
                    <div key={character.id} style={{display: 'flex', flexDirection: 'column'}}>
                        <Title level="3">{character.firstName}</Title>
                        <Subhead>{character.description}</Subhead>
                    </div>
                </Cell>
            })} */}
        </Group>

        <BottomButton text="Дальше" go={() => go(Steps.USER_INFO)}></BottomButton>
    </Panel>
};

export default SelectCharacter;