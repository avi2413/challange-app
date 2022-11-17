import React from 'react';
import { Link, BrowserRouter, Routes, Route } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';

import Home from './components/Home/Home';
import Problem1 from './components/Problem1/Problem1';
import Leaders from './components/Leaderboard/Leaderboard';

const App = () => {

	const actions = [
		{ icon: <Link to={'/leaderboard'}><EmojiEventsIcon /></Link>, name: 'Leaderboard' }
	];
	return (
		<BrowserRouter>
			<Container maxWidth="lg">
				<Routes>
					<Route path="/" element = { <Home/> } />
					<Route path="/problem1" element = { <Problem1/> } />
					<Route path="/leaderboard" element = { <Leaders/> } />
				</Routes>
				<Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
					<SpeedDial
					ariaLabel="SpeedDial basic example"
					sx={{ position: 'absolute', bottom: 16, right: 16 }}
					icon={<SpeedDialIcon />}
					>
						{actions.map((action) => (
							<SpeedDialAction
								key={action.name}
								icon={action.icon}
								tooltipTitle={action.name}
							/>
						))}
					</SpeedDial>
				</Box>
			</Container>
		</BrowserRouter>
	);
}

export default App;
