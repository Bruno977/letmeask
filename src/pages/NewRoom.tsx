import React, { FormEvent } from "react";
import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";

import "../styles/auth.scss";
import { Button } from "../components/Button";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";
export function NewRoom() {
  const history = useNavigate();
  const { user } = useAuth();

  const [newRoom, setNemRoom] = React.useState("");

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();
    if (newRoom.trim() === "") {
      return;
    }
    const roomRef = database.ref("rooms");
    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });
    history(`/rooms/${firebaseRoom.key}`);
  }
  return (
    <div id="page-auth">
      <aside>
        <img
          src={illustrationImg}
          alt="Iustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de &amp; A ao-vivo</strong>
        <p>Tire suas dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />

          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={({ target }) => setNemRoom(target.value)}
              value={newRoom}
            />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>
            Quer entrar em uma sala existente ? <Link to="/">Clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
