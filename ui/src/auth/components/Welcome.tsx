import { Button } from '@blueprintjs/core';

import { useLogout } from '../hooks/useAuthQueries';

import './Welcome.scss';

type WelcomeProps = { user: string }

export const Welcome = ({ user }: WelcomeProps) => {
    const { mutate } = useLogout('logged out');

    return (
        <div className='welcome-user'>
            <div>You are currently logged in as {user}</div>
            <Button onClick={() => mutate()}>Log Out</Button>
        </div>
    );
};
