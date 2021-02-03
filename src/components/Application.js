import { render } from '@testing-library/react';
import React, { useState } from 'react';
import DeckList from './DeckList';
import DeckModal from './DeckModal';
import NavbarApp from './NavbarApp'
import { useAuth0 } from "@auth0/auth0-react";

function Application() {
  const { user } = useAuth0();
  const [secret] = useState(user['https://faunadb.com/id/secret']);
  const [activeDeck, setActiveDeck] = useState(null);

  const handleSetActiveDeck = (deck) => {
    setActiveDeck(deck);
  }

  const handleCloseDeckModal = () => {
    setActiveDeck(null);
  }

  return(
    <div className="h-screen">
      <NavbarApp />

      <div className="flex flex-wrap max-w-4xl m-auto px-4 lg:px-0 mt-8">

        <h4 className="w-full mb-2">Your Decks</h4>
        <DeckList secret={secret} setActiveDeck = {handleSetActiveDeck}/>
        {activeDeck ? <DeckModal deck={activeDeck} close = {handleCloseDeckModal} /> : null}

      </div>
    </div>
  );
}

export default Application;
