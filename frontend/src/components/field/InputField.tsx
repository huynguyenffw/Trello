import React, { useState } from 'react';
import { IBaseApi } from '../../api/Base';

const InputField = ({
  id,
  name,
  onCreated,
  onUpdated,
  onCanceled,
  editing,
  inputName
}: {
  id: string;
  name: string;
  onCreated?(name: string): void;
  onUpdated?(name: string): void;
  onCanceled?(): void;
  editing?: boolean;
  api: IBaseApi;
  inputName: string;
}): JSX.Element => {
  const [itemId] = useState(id);
  const [itemName, setItemName] = useState(name);
  const handleSaveItem = async (): Promise<void> => {
    if (!itemName) {
      alert(`Please enter ${inputName} name.`);
      return;
    }
    if (itemId) {
      onUpdated && onUpdated(itemName);
    } else {
      onCreated && onCreated(itemName);
      setItemName('');
    }
  };
  return (
    <div className="shadow-lg p-4">
      <input
        className="shadow appearance-none border rounded w-64 max-w-full mr-4 py-2 px-3 text-gray-700 leading-tight mb-3"
        type="text"
        value={itemName}
        placeholder={`Please enter ${inputName} name.`}
        onChange={(e) => setItemName(e.target.value)}
        aria-label={`Enter ${inputName} name.`}
        data-testid="input-field"
      />
      <button
        className="btn"
        data-testid="save-button"
        aria-label={`Submit ${inputName} name.`}
        onClick={handleSaveItem}>
        {itemId ? 'Update' : 'Add'}
      </button>
      {editing && (
        <button
          className="btn btn--cancel"
          data-testid="cancel-button"
          aria-label={`Submit ${inputName}.`}
          onClick={onCanceled}>
          Cancel
        </button>
      )}
    </div>
  );
};

export default InputField;
