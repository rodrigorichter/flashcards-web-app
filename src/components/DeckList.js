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
      isLoadingDeck: false,
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
    this.setState({isLoadingDeck: true, newDeckFieldInputValue: ''});

    return fetch('/.netlify/functions/decks-create', {
      body: JSON.stringify(data),
      method: 'POST'
    }).then(response => {
      return response.json()
    }).then(data => {
      this.setState({isLoadingDeck: false, decks: this.state.decks.concat(data)});
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
    this.fetchDecks({'secret': this.props.secret});
  }

  toggleDeckField() {
    this.setState({isCreatingDeck: !this.state.isCreatingDeck});
  }

  render() {
    var newDeckField = null;
    var loadingDeckField = null;

    if (this.state.isCreatingDeck) {
      newDeckField = (
        <div>
          <div className="relative rounded shadow my-2">
            <input autoFocus type="text" onChange={e => this.setState({newDeckFieldInputValue: e.target.value})} value={this.state.newDeckFieldInputValue} placeholder="Name" className="ring-2 ring-transparent focus:ring-primary border border-gray-400 focus:border-transparent rounded w-full p-4" />
          </div>
          <div className="flex">
            { this.state.newDeckFieldInputValue ?
              <Button regular
              withicon
              onClick={() => this.createDeck({'name': this.state.newDeckFieldInputValue, 'secret': this.props.secret})}>
                        <HiPlus size={20} />&nbsp;New Deck
              </Button>
              : <Button regulardisabled
              disabled
              withicon>
                          <HiPlus size={20} />&nbsp;New Deck
                </Button>
            }
            <Button textblack onClick={() => this.toggleDeckField()}>Cancel</Button>
          </div>
        </div>
      );
    }
    else {
      newDeckField = (
        <Button text withicon onClick={() => this.toggleDeckField()}><HiPlus size={20} />&nbsp;New Deck</Button>
      );
    }

    if (this.state.isLoadingDeck) {
      loadingDeckField = (
        <div>
          <div className="animate-pulse relative rounded shadow my-2">
            <div className="h-16 p-2">
            <div className="mt-2 h-4 bg-gray-500 rounded w-48"></div>
            </div>
          </div>
        </div>
      )
    }


    const listItems = this.state.decks && this.state.decks.map((d) =>
      <div id={d.ref['@ref'].id} className="relative rounded shadow my-2" onClick={(e) => {this.props.setActiveDeck(d)}}>
        <div className="h-16 p-2">
          <p className="">{d.data.name}</p>
          <div className="absolute right-2 inset-y-2 flex items-center">
            <Button icon onClick={() => this.deleteDeck({'id': d.ref['@ref'].id, 'secret': this.props.secret})}><HiOutlineTrash size={24} /></Button>
          </div>
        </div>

      </div>
    );

    return (
      <div className="w-full">
        {listItems}
        {loadingDeckField}
        {newDeckField}
      </div>
    )
  }
}
