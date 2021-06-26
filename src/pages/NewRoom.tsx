import { Link, useHistory } from 'react-router-dom';
import { FormEvent, useState } from 'react';

import ilustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import { Button } from '../components/Button';


import '../styles/auth.scss';
import { database } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';
// import { useAuth } from '../hooks/userAuth';

export function NewRoom(){
    const { user } = useAuth();
    const history = useHistory();
    const [newRoom, setNewRoom] = useState('');
    
    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();
        
        if(newRoom.trim() === ''){
            return;
        }

        const roomRef = database.ref('rooms');

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
            author: user?.name,
        })

        history.push(`/Admin/rooms/${firebaseRoom.key}`);

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
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={handleCreateRoom} >
                        <input 
                            type="text" 
                            placeholder="nome da sala"
                            onChange= {event => setNewRoom(event.target.value)}
                            value={newRoom}
                        />
                        <Button type="submit">
                            Criar sala
                        </Button>
                    </form>
                    <p>Quer enrar em uma sala existente? <Link to="/">clique aqui</Link></p>
                </div>
            </main>
        </div>
    )
}