import React from "react";

import Header from "@/features/web/components/Header/Header";
import Footer from "@/features/web/components/Footer/Footer";

import style from "@/features/web/pages/home/HomePage.module.css";

export const HomePage = () => {
	return (
		<>
			<Header />
			<section className={style.home_main}>
				<div className={style.home_main_container}>
					<div className={style.home__main__container__shadow}></div>
					<h1 className={style.home_about_h1}>LA FORMA CONVENIENTE DE HACER TUS CARGAS</h1>
				</div>
			</section>
			<Footer />
		</>
	);
};
