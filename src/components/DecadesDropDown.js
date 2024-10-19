import React from 'react'
import { NavDropdown } from 'react-bootstrap';
export function DecadesDropDown(props) {
    const { handleDecadeSelect } = props;

    const useDecades = () => {
        const currentDecade = Math.floor(new Date().getFullYear() / 10) * 10;
        const decades = ['All'];
        for (let i = currentDecade; i >= 1950; i -= 10) {
          decades.push(i);
        }
        return decades;
      };

    const decades = useDecades();

  return (
    <>
    {decades.map((d) => (
        <NavDropdown.Item
          key={d}
          eventKey={d}
          onClick={handleDecadeSelect(d)}
        >
          {d}
        </NavDropdown.Item>
      ))}
    </>
  )
}
