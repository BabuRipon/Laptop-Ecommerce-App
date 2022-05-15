import React from 'react';

const CategoryForm=({category,setCategory,handleSubmit})=>(<form onSubmit={handleSubmit} className="mb-4">
<input 
className="form-control"
autoFocus
onChange={e=>setCategory(e.target.value)}
value={category}
placeholder="category"
type="text"
required
/>
<br />
<button className="btn btn-outline-primary">create/update</button>
</form>)

export default CategoryForm;