import { FormEvent, useState } from 'react';
import {useHistory} from 'react-router-dom';

import { database } from '../services/firebase';
import { useRoomList } from '../hooks/useRoomList';

import { Button } from '../components/Button';

// import '../styles/question.scss';
import '../styles/auth.scss';


export function Rooms(){
    const { rooms } = useRoomList();
    const history = useHistory();
    const [roomCode, setroomCode] = useState('');

    async function handleJoinRoom(event: FormEvent){
        event.preventDefault();

        if(roomCode.trim() === ''){
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if(!roomRef.exists()) {
            alert('Room does not exists.')
            return;
        }

        if(roomRef.val().endedAt) {
            alert('Room already closed.');
            return;
        }

        history.push(`/rooms/${roomCode}`)
    }
    return(
        <form onSubmit={handleJoinRoom}>
            <select
                onChange={event => setroomCode(event.target.value)}
                value={roomCode}
            >
                {rooms && rooms.map(room => 
                    <option key={room.id} value={room.id}>{room.title}</option>
                )}
            </select>
            <Button type="submit">
                Entrar na sala
            </Button>
        </form>
    )
}



