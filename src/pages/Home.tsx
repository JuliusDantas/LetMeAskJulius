import { FormEvent, useState } from 'react';
import {useHistory} from 'react-router-dom';

import ilustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import { Button } from '../components/Button';

import '../styles/auth.scss';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
import { useRoomList } from '../hooks/useRoomList';


export function Home(){
    const history = useHistory();
    const { rooms } = useRoomList();
    
    const { user, signInWhithGoogle } = useAuth();
    const [roomCode, setroomCode] = useState('');

    async function handleCreateRoom() {
        if(!user){
            await signInWhithGoogle()
        }
        history.push('/rooms/new');
                
    }

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
        <div id="page-auth">
            <aside>
                <img src={ilustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao vivo</strong>
                <p>Tire suas dúvidas da sua audiência em tempo real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="Google" />
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">ou selecione uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <select
                                onChange={event => setroomCode(event.target.value)}
                                value={roomCode}
                                placeholder="Selecione a sala"
                            >
                                {rooms && rooms.map(room => 
                                    <option key={room.id} value={room.id}>{room.title}</option>
                                )}
                        </select>
                        <div className="separator">ou digite o código da sala</div>
                        <input 
                            type="text" 
                            placeholder="digite o código da sala"
                            onChange={event => setroomCode(event.target.value)}
                            value={roomCode}
                        />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                    {/* <form onSubmit={handleJoinRoom}>
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
                    </form> */}
                </div>
            </main>
        </div>
    )
}