import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './App.css';

const finalSpaceCharacters = [
  {
    id: 'bulbasaur',
    name: 'Bulbasaur',
    thumb: '/images/bulbasaur.jpg'
  },
  {
    id: 'charmander',
    name: 'Charmander',
    thumb: '/images/charmander.jpg'
  },
  {
    id: 'caterpie',
    name: 'Caterpie',
    thumb: '/images/caterpie.jpg'
  },
  {
    id: 'wartortle',
    name: 'Wartortle',
    thumb: '/images/wartortle.jpg'
  },
  {
    id: 'charizard',
    name: 'Charizard',
    thumb: '/images/charizard.jpg'
  }
]

function App() {
  const [characters, updateCharacters] = useState(finalSpaceCharacters);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Pokemon Characters</h1>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="characters">
            {(provided) => (
              <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                {characters.map(({ id, name, thumb }, index) => {
                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <div className="characters-thumb">
                            <img src={thumb} alt={`${name} Thumb`} />
                          </div>
                          <p>
                            {name}
                          </p>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </header>
    </div>
  );
}

export default App;