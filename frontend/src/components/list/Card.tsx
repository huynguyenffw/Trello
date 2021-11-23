import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import API from '../../api/Card';
import InputField from '../field/InputField';

export interface ICard {
  text: string;
  id: string;
}

interface ICardDetail extends ICard {
  onDeleted(id: string): void;
}
const Card = ({ text, id, onDeleted }: ICardDetail): JSX.Element => {
  const [editing, setEditing] = useState(false);
  const [cardName, setCardName] = useState(text);

  const handleDeleteCard = async (): Promise<void> => {
    if (confirm(`Are you sure you want to delete ${text} card?`)) {
      await API.deleteItem(id);
      onDeleted(id);
    }
  };

  const handleUpdatedCard = async (name: string): Promise<void> => {
    await API.updateItem(id, { text: name, id });
    setCardName(name);
    setEditing(false);
  };
  return (
    <div className="bg-white shadow-lg p-10 rounded-lg mb-5">
      <div className=" flex justify-between">
        <div>
          <h3 data-testid="repo-name" className="text-2xl font-bold">
            {cardName}
          </h3>
        </div>

        <div className="text-orange">
          <button
            className="mr-2"
            aria-label={`Update ${cardName} card.`}
            onClick={() => setEditing(true)}
            data-testid="update-btn">
            <FaEdit />
          </button>
          <button
            aria-label={`Delete ${cardName} card.`}
            data-testid="delete-btn"
            onClick={handleDeleteCard}>
            <FaTrash />
          </button>
        </div>
      </div>
      {editing && (
        <>
          <div data-testid="editing-form">
            <InputField
              id={id}
              name={cardName}
              editing={true}
              onUpdated={handleUpdatedCard}
              onCanceled={() => setEditing(false)}
              inputName="card"
              api={API}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
