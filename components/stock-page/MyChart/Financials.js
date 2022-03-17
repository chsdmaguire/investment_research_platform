export default {
        calcMargin(response) {
            const arr = response.sort((a, b) => (a.date > b.date) ? 1: -1);
            const grossMargin = [];
            arr.forEach(item => {
                const date = new Date(item.date).getTime();
                const val = item.fsli / item.revenue
                grossMargin.push([date, val])
            });
            
            return grossMargin;
        },
        calc1(response) {
            const arr = response.sort((a, b) => (a.date > b.date) ? 1: -1);
            const newArray = [];
            arr.forEach(item => {
                const date = new Date(item.date).getTime();
                const val = item.top / item.bottom
                newArray.push([date, val])
            });
            
            return newArray;
        },

        calc2(response) {
            const arr = response.sort((a, b) => (a.date > b.date) ? 1: -1);
            const newArray = [];
            arr.forEach(item => {
                const date = new Date(item.date).getTime();
                const val = (item.top_first - item.top_second) / item.bottom
                newArray.push([date, val])
            });
            
            return newArray;
        }
}