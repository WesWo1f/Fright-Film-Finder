import React from 'react';
import { NavDropdown } from 'react-bootstrap'; 

export function GenreDropDown({ genresList, handleGenreSelect }) { 
    return (
        <>
            { genresList?.length > 0 ? (
                genresList.map((g) => (
                    <NavDropdown.Item
                        key={g.id}
                        eventKey={g.name}
                        onClick={handleGenreSelect(g)}
                    >
                        {g.name}
                    </NavDropdown.Item>
                ))
            ) : (
                <NavDropdown.Item disabled>No items available</NavDropdown.Item>
            )}
        </>
    );
}