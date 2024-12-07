import { Grid2 } from "@mui/material";
import ContactList from "./components/ContactList";
import { cacheKey, getContacts } from "./api/api";
import useSWR from "swr";

function App() {
  const {data: contacts, error, isLoading, mutate} = useSWR(cacheKey, getContacts);

  if(isLoading) return <div>Loading...</div>

  if(error) return <div>{error}</div>

	return (
		<Grid2 container>
			<ContactList contacts={contacts} />
		</Grid2>
	);
}

export default App;
