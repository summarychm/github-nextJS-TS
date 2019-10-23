import HeaderFooter from "../../layouts/HeaderFooter";
// const HomePage=dynamic(import("../../components/"))

export default () => {
	return (
		<HeaderFooter active="home">
			<div id="homepage">HomePage</div>
			<style>{`
        #homepage { 
          width: 100%; 
          height:600px; 
          background-color: #f7f7f7; 
          display: flex; 
          justify-content: center; 
          align-items: center 
        }
      `}</style>
		</HeaderFooter>
	);
};
