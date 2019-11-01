import { Row, Col, Pagination, List } from "antd";
import Link from "next/link";
import { withRouter } from "next/router";

const LANGUAGES = ["JavaScript", "HTML", "CSS", "TypeScript", "Java", "Rust"];
const SORT_TYPES = [
	{
		name: "Best Match",
	},
	{
		name: "Most Stars",
		value: "stars",
		order: "desc",
	},
	{
		name: "Fewest Stars",
		value: "stars",
		order: "asc",
	},
	{
		name: "Most Forks",
		value: "forks",
		order: "desc",
	},
	{
		name: "Fewest Forks",
		value: "forks",
		order: "asc",
	},
];

function Search({ router }) {
	console.log('============ "Search router" begin ====================');
	console.log(router);
	console.log('============ "Search router" end ======================');
	return <>Search Page</>;
}

export default withRouter(Search);
