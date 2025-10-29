import '../Categories/Categories.css'
import axios from 'axios';
import { useEffect,useState } from 'react';
export default function Categories(){
    const [cats, setCats] = useState([]);
    //Lấy dữ liệu danh mục
    useEffect(() => {
  axios.get('http://localhost:3000/categories')
    .then(res => {setCats(res.data.categories);
        console.log(res.data);
    })
    .catch(err => console.error(err));
}, []);
    return(
    <div>
    <h2>Danh mục</h2>
    <ul className="categories">
   
        {cats.map(c => (
          <li key={c.id}>{c.name}</li>
        ))}
      
    </ul>
    </div>);
}