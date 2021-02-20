import React from 'react';
import Button from './Button';
import { FiAlertTriangle } from "react-icons/fi";

export default function ConfirmationDialog(props) {

  return (
    <div>
      <div class="fixed z-10 inset-0 overflow-y-auto">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

          <div class="fixed inset-0 transition-opacity" aria-hidden="true">
            <div class="absolute inset-0 bg-gray-500 opacity-75" onClick={(e) => props.close()}></div>
          </div>

          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

          <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <FiAlertTriangle size={24} className="text-danger" />
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h6>
                    {props.content}
                  </h6>
                </div>
              </div>
            </div>
            <div class=" px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <Button textblack onClick={(e) => props.close()}>Cancel</Button>
              <Button regular onClick={props.onConfirm}>{props.confirmButtonContent}</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
