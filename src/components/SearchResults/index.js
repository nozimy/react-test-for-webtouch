import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class SearchResults extends React.Component {
    render(){
        return (
            <Table >
                <TableHead>
                    <TableRow>
                        <TableCell>Название</TableCell>
                        <TableCell>Владелец</TableCell>
                        <TableCell numeric>Кол-во звезд</TableCell>
                        <TableCell>Ссылка</TableCell>
                        <TableCell>Избранное</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.props.items.map((item, i) => (
                        // <li key={i}>{item.full_name}</li>
                        <TableRow key={i}>
                            <TableCell component="th" scope="row">
                                {item.full_name}
                            </TableCell>
                            <TableCell> 
                                {item.owner.login}
                            </TableCell>
                            <TableCell> 
                                {item.stargazers_count}
                            </TableCell>
                            <TableCell> 
                                <a href={item.html_url}>{item.html_url}</a>
                            </TableCell>
                            <TableCell> 
                                -
                            </TableCell>
                        </TableRow>
                        )
                    )}
                </TableBody>
            </Table>
        );
    }
}

export default SearchResults;