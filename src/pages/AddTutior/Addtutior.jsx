
import { use } from 'react';
import { AuthContext } from '../../components/Auth/AuthProvider';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import { envVars } from '../../config';

const Addtutior = () => {
    const {user}= use(AuthContext)
    console.log(user)
    const navigate = useNavigate()
    if(!user){
        return <h1 className='text-center mt-10'><span className="loading loading-dots loading-xl mx-auto mt-10"></span></h1>
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        const form =e.target;
        const formData =new FormData(form)
        const data = Object.fromEntries(formData.entries())
        console.log(data)
        axios.post(`${envVars.backend_origin}/addtutior`,data)
        .then((res)=>{
            if(res.data.insertedId){
                Swal.fire(" tutior add sucessfully ");
               navigate('/find-tutior')
            }
        } )
        .catch((err)=>{
            console.log(err)
        })

    }
    return (
        <div>
             <div className="max-w-xl mx-auto bg-white p-6 shadow-md mt-6 rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-primary text-center">Add Tutor</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <input type="text" name='name' defaultValue={user.displayName} readOnly placeholder='Name'   required className="input input-bordered w-full" />
        <input type="text" name='email' defaultValue={user.email} readOnly  placeholder='Email'   required className="input input-bordered w-full" />
        <input type="text" name="category" placeholder='category'   required className="input input-bordered w-full" />
        
        <input type="text" name="image" placeholder="Tutor Image URL" required className="input input-bordered w-full" />
        
        <input type="text" name="language" placeholder="Language" required className="input input-bordered w-full" />
        
        <input type="number" name="price" placeholder="Price" required className="input input-bordered w-full" />
        
        <textarea name="description" placeholder="Description" required className="textarea textarea-bordered w-full" />
        
        <input type="number" name="review" defaultValue={0} readOnly hidden />

        <button type="submit" className="btn btn-primary w-full">Submit</button>
      </form>
    </div>
        </div>
    );
};

export default Addtutior;