import useSpaceStore from '@twidge/utils/spaces/state';
import { useEffect, useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';
import SpaceLayout from '../../layouts/space/layout';
import Body from './components/body';
import SpaceCtx from './ctx';
import getClipboardData from './functions/clipboard';

const SpacePage = () => {
	const { id } = useParams();
	const spaces = useSpaceStore((spaces) => spaces.spaces);
	const currentSpace = useMemo(() => {
		return spaces.filter((space) => space.id === parseInt(id as any))[0];
	}, [spaces]);
	const spaceRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const onPaste = async (ev: ClipboardEvent) => {
			getClipboardData(ev);
		};

		spaceRef.current?.addEventListener('paste', onPaste);

		return () => {
			spaceRef.current?.removeEventListener('paste', onPaste);
		};
	}, []);

	return (
		<SpaceCtx.Provider value={{ currentSpace: currentSpace }}>
			<SpaceLayout ref={spaceRef} animate={false}>
				<Body />
			</SpaceLayout>
		</SpaceCtx.Provider>
	);
};

export default SpacePage;