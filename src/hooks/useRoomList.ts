import { useEffect, useState } from "react";
import { database } from "../services/firebase";

type RoomType = {
  id: string;
  title: string | undefined;
}

export function useRoomList() {
    const [rooms, setRooms] = useState<RoomType[]>()

    useEffect(() => {
      const roomRef = database.ref('rooms');
  
      roomRef.on('value', room => {
        const value = room.val();
        var result: RoomType[] = Object.keys(value).map(key => {
          console.log(key, value[key]);
          return { id: key, title: value[key].title }
        })
        
        setRooms(result)
      })
    }, []);

    return {rooms}
}