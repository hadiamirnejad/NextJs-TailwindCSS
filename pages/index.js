import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import Feed from "../components/Feed";
import AddPostModal from "../components/AddPostModal";
import axios from "axios";
import {sessionState, authUserState} from '../atoms/modalAtom'
import { useRecoilState } from "recoil";
import Cookies from 'js-cookie'
import { useEffect } from "react";

function Home({ props }) {
  const [session, setSession] = useRecoilState(sessionState)
  const [authUser, setAuthUser] = useRecoilState(authUserState)
  const status = ''

  useEffect( ()=>{
    const getHashId = async()=>{
      const hashId = Cookies.get('connectedId')
      console.log(hashId);
      if(hashId){
        const getSessionQuery = `
        query GetSession {
          getSession(hashedid:"${hashId}") {
          name
          username
          id
          avatar
          role
          balance
        }}
        `;
        const response = await axios.post('http://localhost:4000/graphql', {
          query: getSessionQuery,
        });
        if (!response.data.data) {
          Cookies.remove("connectedId");
          setSession(false)
        }
        else{
          console.log(response.data.data)
          setSession(true)
          setAuthUser(response.data.data.getSession)
        }
      }
      else{
        Cookies.remove("connectedId");
        setSession(false)
      }
    }
    getHashId();
  },[])
  return (
    <>
      {status == "loading" ? (
        <p>در حال دریافت اطلاعات</p>
      ) : (
        <div className="h-screen overflow-y-scroll scrollbar-hide">
          <Head>
            <title>اینستاگرام</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Header />
          <Feed />
          <AddPostModal />
        </div>
      )}
    </>
  );
}

export async function getServerSideProps() {
  
  if (process.env.CSRF_TOKEN.toString() == "") {
    const insertCSRFTokenQuery = `
    mutation {
      insertToken {
        token
        expired
      }
    }
    `;
    let response = await axios.post(process.env.GRAPHQL_API, {
      query: insertCSRFTokenQuery,
    });
    process.env.CSRF_TOKEN = response.data.data.insertToken.token;
  }
  return { props: {} };
}

export default Home;
