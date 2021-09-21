import ListItem from './ListItem';
import { gql, useQuery, useLazyQuery } from '@apollo/client';
import Loader from 'react-loader-spinner'
import { useState } from 'react';

const ListPassenger = props => {
    const GetPassengerList = gql`
    query MyQuery {
        anggota {
          id
          nama
          umur
          jenis_kelamin
        }
      }
    `

    const GetPassengerById = gql`
    query MyQuery($id: Int!) {
        anggota(where: {id: {_eq: $id}}) {
          id
          nama
          umur
          jenis_kelamin
        }
      }
    `

    // const {data, loading, error} = useQuery(GetPassengerList);
    const [getPassenger, {data, loading, error}] = useLazyQuery(GetPassengerById)
    const [passengerId, setPassengerId] = useState('');
    const [list, setList] = useState([]);

    if (loading) {
        return (
            <>
                <Loader type="Circles" color="#00BFFF" height={80} width={80}/>
            </>
        )
    }
    
    if (error) {
        console.log(error)
        return null
    }

    const onChangeId = (e) => {
        if (e.target) {
            setPassengerId(e.target.value)
        }
    }

    const onGetData = () => {
        getPassenger({variables: {
            id: passengerId
        }})
        setList(data?.anggota)
    }

    return (
        <div>
            <table cellPadding="5px" cellSpacing="0" style={{margin: "auto"}}>
                <thead bgcolor="red">
                    <td>Nama</td>
                    <td>Umur</td>
                    <td>Jenis Kelamin</td>
                    <td bgcolor="white" className="removeBorder"></td>
                </thead>
                {data?.anggota.map(item => (
                    <ListItem
                        key={item.id}
                        data={item}
                        hapusPengunjung={props.hapusPengunjung}
                    />
                ))}
            </table>
            {console.log(data?.anggota)}
            {data?.anggota.length === 0 ? <h5>Id pengguna {passengerId} tidak ditemukan</h5> : null}
            <input value={passengerId} onChange={onChangeId} placeholder="Input your id here"/>
            <button onClick={onGetData}>Get Passenger by Id</button>
        </div>
    )
  }

export default ListPassenger;