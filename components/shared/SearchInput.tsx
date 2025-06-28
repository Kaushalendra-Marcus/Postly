"use client"
import { fetchUsers } from "@/lib/actions/user.actions"
import UserCard from "../cards/UserCard"
import { useEffect, useState } from "react"
interface Props {
    currentUserId: string
}
const SearchInput = ({ currentUserId }: Props) => {
    const [search, setSearch] = useState("")
    const [users, setUsers] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const getUsers = async (searchString: string) => {
        setLoading(false)
        const result = await fetchUsers({
            userId: currentUserId,
            searchString,
            pageNumber: 1,
            pageSize: 20,
        })
        setUsers(result.users)
        setLoading(false)
    }
    useEffect(() => {
        getUsers("")
    }, [])

    useEffect(() => {
        const delayTime = setTimeout(() => {
            getUsers(search)
        }, 500);
        return clearTimeout(delayTime)
    }, [search])
    return (
        <section>
            <h1 className="mb-10 head-text">Search</h1>
            <input
                type="text"
                placeholder="Search User......"
                value={search}
                onChange={(e) => { setSearch(e.target.value) }}
                className="w-full p-2 mb-4 border rounded"
            />
            {loading && <p>Loading...</p>}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {users.length === 0 ? (
                    <p>No users found.</p>
                ) : (
                    users.map((person) => (
                        <UserCard
                            key={person.id}
                            id={person.id}
                            name={person.name}
                            username={person.username}
                            imgUrl={person.image}
                            personType="User"
                        />
                    ))
                )}
            </div>
        </section>
    )
}

export default SearchInput
