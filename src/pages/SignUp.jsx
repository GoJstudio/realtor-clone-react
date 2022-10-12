import React, { useState } from 'react';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db } from "../firebase";
import { serverTimestamp, doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const {name, email, password} = formData;
  const navigate = useNavigate();

  function onChange(e) {
    // 이전 formData 객체를 복사하고 email: 값만 바꾼다.
    // array, Object, function은 reference 자료형이다.
    setFormData((formData) => ({
      ...formData,
      // email: {email(입력한 email)} 
      [e.target.id]: e.target.value
    }));
  }

  async function onSubmit(e) {
    e.preventDefault();

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        updateProfile(auth.currentUser, {
          displayName: name
        });

        const formDataCopy = {...formData};
        delete formDataCopy.password;
        formDataCopy.timestamp = serverTimestamp();
        setDoc(doc(db, 'users', user.uid), formDataCopy);
        navigate('/');
        // toast.success('Sign up was successful.')
        console.log(user);
      })
      .catch ((error) => {
          toast.error("Something went wrong with the registration");
      });

    // try {
    //   const auth = getAuth();
    //   const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    //   updateProfile(auth.currentUser, {
    //     displayName: name
    //   })
    //   const user = userCredential.user
    //   console.log(user);
    // } catch (error) {
    //   console.log(error);
    // }
  }

  return (
    <section>
      <h1 className='text-center text-3xl font-bold mt-6'>Sign Up</h1>

      <div className='container max-w-6xl flex justify-center flex-wrap items-center px-6 py-12 mx-auto'>
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
          <img src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2273&q=80" alt="key" className='w-full rounded-2xl' />
        </div>

        <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
          <form onSubmit={onSubmit}>
            <input
              className='w-full bg-white text-gray-700 text-xl px-4 py-2 mb-6 border-gray-300 rounded transition ease-in-out'
              type="text"
              id='name'
              value={name}
              onChange={onChange}
              placeholder='Full name'
            />
            <input
              className='w-full bg-white text-gray-700 text-xl px-4 py-2 mb-6 border-gray-300 rounded transition ease-in-out'
              type="email"
              id='email'
              value={email}
              onChange={onChange}
              placeholder='Email address'
            />
            <div className='relative mb-6'>
              <input
                className='w-full bg-white text-gray-700 text-xl px-4 py-2 border-gray-300 rounded transition ease-in-out'
                type={showPassword ? 'text' : 'password'}
                id='password'
                value={password}
                onChange={onChange}
                placeholder='Password'
              />
              {showPassword ?
              (<AiFillEyeInvisible className='cursor-pointer absolute right-3 top-3 text-xl' onClick={() => {
                setShowPassword(!showPassword);
              }}/>) :
              (<AiFillEye className='cursor-pointer absolute right-3 top-3 text-xl' onClick={() => {
                setShowPassword(!showPassword);
              }} />)}
            </div>
            <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
              <p className='mb-6'>
                Have an account?
                <Link to='/sign-in' className='text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1'>Sign in</Link>
              </p>
              <p>
                <Link to='/forgot-password' className='text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out'>Forgot password?</Link>
              </p>
            </div>
            <button className='w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800' type="submit">Sign up</button>
            <div className='my-4 flex items-center before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300'>
              <p className='text-center font-semibold mx-4'>OR</p>
            </div>
            <OAuth />
          </form>
        </div>
      </div>
    </section>
  )
}
