import React from 'react';
import Button from './Button';
import { HiOutlineTrash, HiPlus } from "react-icons/hi";

export default class DeckList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      decks: [],
      isFetching: false,
      isCreatingDeck: false,
      newDeckFieldInputValue: '',
    };
  }

  fetchDecks(data) {
    this.setState({...this.state, isFetching: true});
    fetch('/.netlify/functions/decks-get', {
      body: JSON.stringify(data),
      method: 'POST'
      })
      .then(response => response.json())
      .then(result => {
        this.setState({decks: result.data, isFetching: false})
      })
      .catch(e => {
        console.log(e);
        this.setState({...this.state, isFetching: false});
      });
  }

  createDeck(data) {
    return fetch('/.netlify/functions/decks-create', {
      body: JSON.stringify(data),
      method: 'POST'
    }).then(response => {
      return response.json()
    })
  }

  deleteDeck(data) {
    const decks = [...this.state.decks];
    decks.splice(this.state.decks.findIndex(function(d) {
      return d.id === data;
    }), 1);
    this.setState({decks: decks});

    return fetch('/.netlify/functions/decks-delete', {
      body: JSON.stringify(data),
      method: 'POST'
    }).then(response => {
      return response.json();
    })
  }

  componentDidMount() {
    //this.fetchDecks(this.props.secret);
  }

  toggleDeckField() {
    this.setState({isCreatingDeck: !this.state.isCreatingDeck});
  }

  render() {
    var newDeckField = null;
    const myDeck = {
      name: "Hello World Deck!",
    }

    if (this.state.isCreatingDeck) {
      newDeckField = (
        <div>
          <div class="relative rounded shadow my-2">
            <input type="text" onChange={e => this.setState({newDeckFieldInputValue: e.target.value})} value={this.state.newDeckFieldInputValue} placeholder="Name" className="ring-2 ring-transparent focus:ring-primary border border-gray-400 focus:border-transparent rounded w-full p-4" />
          </div>
          { this.state.newDeckFieldInputValue ?
            <Button regular
                    withicon
                    onClick={() => this.createDeck({name: this.state.newDeckFieldInputValue, secret: this.props.secret})}>
                      <HiPlus size={20} />&nbsp;New Deck
            </Button>
            : <Button regulardisabled
                      disabled
                      withicon>
                        <HiPlus size={20} />&nbsp;New Deck
              </Button>
          }
        </div>
      );
    }
    else {
      newDeckField = (
        <Button text withicon onClick={() => this.toggleDeckField()}><HiPlus size={20} />&nbsp;New Deck</Button>
      );
    }

    const listItems = this.state.decks.map((d) =>
      <div id={d.id} className="relative rounded shadow my-2">
        <div className="h-16 p-2">
          <p className="">{d.name}</p>
          <div className="absolute right-2 inset-y-2 flex items-center">
            <Button icon onClick={() => this.deleteDeck(d.id)}><HiOutlineTrash size={24} /></Button>
          </div>
        </div>

      </div>
    );

    return (
      <div className="w-full">
        {listItems}
        {newDeckField}
      </div>
    )
  }
}
