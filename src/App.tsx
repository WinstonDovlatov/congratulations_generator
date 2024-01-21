import React, { useState, useEffect } from 'react';
import { View, AdaptivityProvider, AppRoot, ConfigProvider, SplitLayout, SplitCol } from '@vkontakte/vkui';

import '@vkontakte/vkui/dist/vkui.css';


import Intro from './panels/Intro';
import SelectCharacter from './panels/SelectCharacter'
import UserInfo from './panels/UserInfo';
import GenerationResult from './panels/GenerationResult';
import { Steps, UserInfoModel } from './model';
import { Final } from './panels/Final';

const App = () => {
	const [activePanel, setActivePanel] = useState('intro');
	// const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
	const [characterId, setCharacterId] = useState<string | null>(null);
	const [userInfo, setUserInfo] = useState<UserInfoModel | null>(null);

	const go = (e: string) => {
		setActivePanel(e);
	};

	return (
		<ConfigProvider>
			<AdaptivityProvider>
				<AppRoot>
					{/* <SplitLayout popout={popout}> */}
					<SplitLayout>
						<SplitCol>
							<View activePanel={activePanel}>
								<Intro id={Steps.INTRO} go={go} />
								<SelectCharacter setCharacterId={setCharacterId} id={Steps.CHARACTER} go={go} />
								<UserInfo setUserInfo={setUserInfo} id={Steps.USER_INFO} go={go} />
								<GenerationResult userInfo={userInfo!} characterId={characterId!} id={Steps.GENERATION} go={go} />
								<Final go={go} id={Steps.FINAL} />
							</View>
						</SplitCol>
					</SplitLayout>
				</AppRoot>
			</AdaptivityProvider>
		</ConfigProvider>
	);
}

export default App;
