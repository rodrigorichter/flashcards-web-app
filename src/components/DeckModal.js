import React from 'react';
import { HiOutlineBookOpen, HiOutlineCog, HiOutlineTrash } from 'react-icons/hi';
import Button from './Button';

export default class DeckModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div class="fixed inset-0 transition-opacity" aria-hidden="true">
            <div class="absolute inset-0 bg-gray-500 opacity-75" onClick={(e) => this.props.close()}></div>
          </div>

          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start flex-wrap">
                <h3 class="text-lg leading-6 font-medium text-textprimary w-full" id="modal-headline">
                    {this.props.deck.data.name}
                </h3>
                <div class="mt-2 flex justify-end w-full">
                    <Button icon><HiOutlineBookOpen size={24} /></Button>
                    <Button icon><HiOutlineCog size={24} /></Button>
                    <Button icon><HiOutlineTrash size={24} /></Button>

                </div>
              </div>
              <div>
                parte principal
              </div>
            </div>
          </div>


        </div>
      </div>
    )
  }
}
