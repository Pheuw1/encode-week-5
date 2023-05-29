import styles from "../styles/Home.module.css";
import LotteryC from "../components/LotteryComponent";
export default function Home() {
  return (
    <div>
      <main className={styles.main}>
        {/* <InstructionsComponent></InstructionsComponent>\ */}
        <LotteryC></LotteryC>
      </main>
    </div>
  );
}
