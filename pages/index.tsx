import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Web3 from 'web3'
import styles from '../styles/Home.module.css'

declare global {
  interface Window { ethereum: any; }
}

const Home: NextPage = () => {

  const [web3, setWeb3] = useState<Web3 | undefined>(undefined)
  const [address, setAddress] = useState<string | undefined>(undefined)
  const [balance, setBalance] = useState<string | undefined>('')

  useEffect(() => {

    if (window.ethereum) {
      window.ethereum.request({ method: "eth_requestAccounts" }).then(async (accounts: Array<string>) => {
        setAddress(accounts[0])
        let w3 = new Web3(window.ethereum)
        setWeb3(w3)

        // get balance
        w3?.eth.getBalance(accounts[0] || '').then((value: string) => {
          setBalance(value);
        });

      })
    }


  }, [])



  return (
    <div className={styles.container}>
      <Head>
        <title>Simple Wallet</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {
          web3 ?
            (
              <>
                <h1 className={styles.title}>
                  Ethereum Ready!
                </h1>
                <p className={styles.description}>
                  Your wallet's address is
                  <code className={styles.code}>{address}</code>
                </p>
                <p className={styles.description}>
                  with {web3.utils.fromWei(balance || '')} eth.
                </p>
              </>
            )
            : (
              <h1 className={styles.title}>
                Please install and enable metamask...
              </h1>
            )
        }


        {/* 

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div> */}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://nextflow.in.th"
          target="_blank"
          rel="noopener noreferrer"
        >
          All Right Reserved | Amaround Co., Ltd.
        </a>
      </footer>
    </div>
  )
}

export default Home
