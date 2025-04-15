
import './PersonForm.css';

const shoeSizes = Array.from({ length: 23 }, (_, i) => (22 + i).toString());
const shirtSizes = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
const pantsSizes = Array.from({ length: 13 }, (_, i) => (38 + i).toString());

const PersonForm = ({ index, person, handleChange }) => {
  return (
    <div className="person-form">
      <h4>Persona {index + 1}</h4>
      <input
        type="text"
        name="fullName"
        placeholder="Nombre completo"
        value={person.fullName}
        onChange={(e) => handleChange(index, e)}
      />
      <input
        type="text"
        name="dni"
        placeholder="DNI"
        value={person.dni}
        onChange={(e) => handleChange(index, e)}
      />
      <input
        type="number"
        name="age"
        placeholder="Edad"
        value={person.age}
        onChange={(e) => handleChange(index, e)}
      />

      <label>Talla Zapatos</label>
      <select name="shoeSize" value={person.shoeSize} onChange={(e) => handleChange(index, e)}>
        <option value="">Seleccionar</option>
        {shoeSizes.map(size => <option key={size} value={size}>{size}</option>)}
      </select>

      <label>Talla Remera/Campera</label>
      <select name="shirtSize" value={person.shirtSize} onChange={(e) => handleChange(index, e)}>
        <option value="">Seleccionar</option>
        {shirtSizes.map(size => <option key={size} value={size}>{size}</option>)}
      </select>

      <label>Talla Pantalón</label>
      <select name="pantsSize" value={person.pantsSize} onChange={(e) => handleChange(index, e)}>
        <option value="">Seleccionar</option>
        {pantsSizes.map(size => <option key={size} value={size}>{size}</option>)}
      </select>
    </div>
  );
};

export default PersonForm;
