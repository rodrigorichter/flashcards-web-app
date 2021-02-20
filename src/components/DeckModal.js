import React from 'react';
import { HiOutlineBookOpen, HiOutlineCog, HiOutlineTrash, HiOutlineArrowLeft, HiPlus, HiOutlinePencil, HiOutlineViewList } from 'react-icons/hi';
import Button from './Button';
import Tooltip from './Tooltip';

export default class DeckModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isStudying: false,
      isInSettings: false,
      isBrowsingCards: false,
      isCreatingCard: false,
      isLoadingCard: false,
      newCardFrontFieldInputValue: '',
      newCardBackFieldInputValue: '',
      cards: []
    };
  }

  fetchCards(data) {
    fetch('/.netlify/functions/cards-get-by-deck', {
      body: JSON.stringify(data),
      method: 'POST'
      })
      .then(response => response.json())
      .then(result => {
        this.setState({cards: result.data})
      })
      .catch(e => {
        console.log(e);
      });
  }

  toggleCardField() {
    this.setState({isCreatingCard: !this.state.isCreatingCard});
  }

  createCard(data) {
    this.setState({isLoadingCard: true, newCardFrontFieldInputValue: '', newCardBackFieldInputValue: ''});

    return fetch('/.netlify/functions/cards-create', {
      body: JSON.stringify(data),
      method: 'POST'
    }).then(response => {
      return response.json()
    }).then(data => {
      this.setState({isLoadingCard: false, cards: this.state.cards.concat(data)});
    })
  }

  deleteCard(data) {
    const cards = [...this.state.cards];
    cards.splice(this.state.cards.findIndex(function(c) {
      return c.ref['@ref'].id === data.id;
    }), 1);
    this.setState({cards: cards});

    return fetch('/.netlify/functions/cards-delete', {
      body: JSON.stringify(data),
      method: 'POST'
    }).then(response => {
      return response.json();
    })
  }

  render() {
    var newCardView = null;
    var loadingCardField = null;

    const studyView = (
      <div>
        <div className="rounded shadow-sm border p-4 mt-2">
          {this.state.isStudying ? null :
            <div className="flex justify-center flex-col">
              <p className="text-center text-textsecond">New: {this.props.deck.data.new_count}</p>
              <p className="text-center text-textsecond">Learning: {this.props.deck.data.learning_count}</p>
              <p className="text-center text-textsecond">To review: {this.props.deck.data.to_review_count}</p>
              <Button regular className="my-12 w-36 self-center">Start Study</Button>
            </div>
          }
        </div>
      </div>
    );

    const cardsListItems = this.state.cards && this.state.cards.map((c) =>
      <div id={c.ref['@ref'].id} className="relative border-b">
        <div className="p-1">
          <p className="">{c.data.front}</p>
          <p className="text-textsecond text-sm">{c.data.back}</p>
          <div className="absolute right-2 inset-y-2 flex items-center">
            <Button icon ><HiOutlinePencil size={24} /></Button>
            <Button icon onClick={() => this.deleteCard({'id': c.ref['@ref'].id, 'secret': this.props.secret})}><HiOutlineTrash size={24} /></Button>
          </div>
        </div>

      </div>
    );

    if (this.state.isCreatingCard) {
      newCardView = (
        <div className="mt-2">
          <div className="relative rounded shadow my-2 ring-2 ring-transparent focus:ring-primary border border-gray-400 focus:border-transparent rounded w-full p-2">
            <input autoFocus type="text" onChange={e => this.setState({newCardFrontFieldInputValue: e.target.value})} value={this.state.newCardFrontFieldInputValue} placeholder="Front side" className="ring-2 ring-transparent focus:ring-primary rounded p-3 mb-1 w-full border-b" />
            <input type="text" onChange={e => this.setState({newCardBackFieldInputValue: e.target.value})} value={this.state.newCardBackFieldInputValue} placeholder="Back side" className="ring-2 ring-transparent focus:ring-primary rounded p-3 mt-1 w-full border-b" />
          </div>
          <div className="flex">
            { this.state.newCardFrontFieldInputValue && this.state.newCardBackFieldInputValue ?
              <Button regular
              withicon
              onClick={() => this.createCard({'deckId': this.props.deck.ref['@ref'].id, 'front': this.state.newCardFrontFieldInputValue, 'back': this.state.newCardBackFieldInputValue, 'secret': this.props.secret})}>
                        <HiPlus size={20} />&nbsp;New Card
              </Button>
              : <Button regulardisabled
              disabled
              withicon>
                          <HiPlus size={20} />&nbsp;New Card
                </Button>
            }
            <Button textblack onClick={() => this.toggleCardField()}>Cancel</Button>
          </div>
        </div>
      );
    }
    else {
      newCardView = (
        <div>
          <Button className="mt-2" text withicon onClick={() => this.toggleCardField()}><HiPlus size={20} />&nbsp;New Card</Button>
        </div>
      );
    }

    if (this.state.isLoadingCard) {
      loadingCardField = (
        <div>
          <div className="relative border-b animate-pulse">
            <div className="p-1">
              <div className="mt-2 h-4 bg-gray-300 rounded w-48"></div>
              <div className="mt-2 h-4 bg-gray-300 rounded w-32"></div>
            </div>
          </div>
        </div>
      )
    }

    const cardsView = (
      <div className="max-h-inherit pb-8 flex flex-col">
        <div className="flex border-b pb-2 mb-2">
          <Button icon onClick={(e) => { this.setState({isBrowsingCards: false}) }}><HiOutlineArrowLeft size={24}/></Button>
          <span className="ml-4 text-textsecond leading-8">Browsing cards</span>
        </div>
        <div className="overflow-y-auto">
          {cardsListItems}
          {loadingCardField}
        </div>
        {newCardView}

      </div>
    )

    const settingsView = (
      <div className="max-h-inherit pb-8">
         <div className="flex border-b pb-2 mb-2">
          <Button icon onClick={(e) => { this.setState({isInSettings: false}) }}><HiOutlineArrowLeft size={24}/></Button>
          <span className="ml-4 text-textsecond leading-8">Deck Settings</span>
        </div>
      </div>
    );

    return (
      <div className="fixed z-10 inset-0 overflow-hidden">
        <div class="flex items-end justify-center h-screen max-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div class="fixed inset-0 transition-opacity" aria-hidden="true">
            <div class="absolute inset-0 bg-gray-500 opacity-75" onClick={(e) => this.props.close()}></div>
          </div>

          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-2xl w-full max-h-9/10" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 max-h-inherit">
              <div className="max-h-inherit pb-8">
                <div class="sm:flex sm:items-start flex-wrap">
                  <h3 class="text-lg leading-6 font-medium text-textprimary w-full" id="modal-headline">
                      {this.props.deck.data.name}
                  </h3>
                  <div class="mt-2 flex justify-end w-full">
                      <Tooltip content="Study"><Button icon onClick={(e) => { this.setState({isInSettings: false, isBrowsingCards: false}) }}><HiOutlineBookOpen size={24} /></Button></Tooltip>
                      <Tooltip content="Browse cards"><Button icon onClick={(e) => { this.setState({isBrowsingCards: true, isInSettings: false}); this.fetchCards({'deckId': this.props.deck.ref['@ref'].id, 'secret': this.props.secret}); }}><HiOutlineViewList size={24} /></Button></Tooltip>
                      <Tooltip content="Settings"><Button icon onClick={(e) => { this.setState({isInSettings: true, isBrowsingCards: false}) }}><HiOutlineCog size={24} /></Button></Tooltip>
                  </div>
                </div>
                {this.state.isBrowsingCards && cardsView}
                {this.state.isInSettings && settingsView}
                {(!this.state.isInSettings && !this.state.isBrowsingCards) && studyView}
              </div>
            </div>
          </div>


        </div>
      </div>
    )
  }
}
