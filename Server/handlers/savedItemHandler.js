module.exports = (io) => {
    const newSavedItem = function (item) {
        /**
         * Item JSON:
         * - item.Servername
         * - item.Player
         * - item.Itemstack
         */
        let slqGetLength = 'SELECT COUNT(id) AS id_count FROM saveditems';
        connection.query(slqGetLength ,(error, results) => {
            if (error) throw error;
            var counter = JSON.parse(JSON.stringify(results))[0].id_count;
            let sqlInsert = 'INSERT INTO saveditems (id, Servername, Itemstack, Player, Datum) VALUES (?,?,?,?,CURRENT_TIMESTAMP)';
            connection.query(sqlInsert, [counter, item.Servername, JSON.stringify(item.Itemstack), JSON.stringify(item.Player)],(error, results) => {
                if (error) throw error;
                io.emit(`saveditem:added`, item)
            }); 
        }); 
    }
    const savedItemList = function () {
        let slqGetLength = 'SELECT * FROM saveditems SORT BY datum DESC';
        connection.query(slqGetLength ,(error, results) => {
            if (error) throw error;
            io.emit(`saveditem:list`, results);
        }); 
    }
    const savedItemAction = function (data) {
        switch (data.Type){
            case "remove":
                var sqlDelete = 'DELETE FROM saveditems WHERE id = ?';
                connection.query(sqlDelete, [data.id],(error) => {
                    if (error) throw error;
                    io.emit(`saveditem:request-list`);
                }); 
                break;
            case "edit":
                var sqlInsert = 'UPDATE saveditems SET Itemstack=? WHERE id=?';
                connection.query(sqlInsert, [JSON.stringify(data.Itemstack), data.id] ,(error, results) => {
                    if (error) throw error;
                    io.emit(`saveditem:request-list`);
                }); 
                break;
        }  
    }
    return {
        newSavedItem,
        savedItemList,
        savedItemAction
    }
}