class StringUtil {
    
    async randomString(length) {
        let result = ''
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
        let charactersLength = characters.length
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength))
        }
        return result
    }

    async randomInt(length) {
        let result = ''
        let characters = '0123456789'
        let charactersLength = characters.length
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength))
        }
        return result
    }

    async replaceAll(old_string, old_regex, new_regex) {
        let new_string = String(old_string).split(old_regex).join(new_regex)
        return new_string
    }

    async sortArrayString(string_list, sort_type) {
        switch (sort_type) {
            case 'Ascending':
                return string_list.sort()
            case 'Descending':
                return string_list.sort().reverse()
        }
    }

    async sortArrayNumber(number_list, sort_type) {
        let arr_sort = []
        switch (sort_type) {
            case 'Ascending':
                arr_sort = number_list.sort(function (a, b) {
                    return a - b;
                });
                return arr_sort
            case 'Descending':
                arr_sort = number_list.sort(function (a, b) {
                    return b - a;
                });
                return arr_sort
        }
    }

    // async sortArrayDate(date_list, sort_type) {
    //     switch (sort_type) {
    //         case 'Ascending':
    //             Array(date_list).sort(
    //                 function dateComparison(a, b) {
    //                     const date1 = new Date(a)
    //                     const date2 = new Date(b)
    //                     return date1 - date2;
    //                 }
    //             )
    //             return date_list
    //         case 'Descending':
    //             Array(date_list).sort(
    //                 function dateComparison(a, b) {
    //                     const date1 = new Date(a)
    //                     const date2 = new Date(b)
    //                     return date2 - date1;
    //                 }
    //             )
    //             return date_list
    //     }
    // }

    async sortArrayDate(date_list, sort_type) {
        return date_list.sort((a, b) => {
            const [dateA, timeA] = a.split(' ');
            const [dayA, monthA, yearA] = (dateA === '--' ? '00/00/0000' : dateA).split('/').map(Number);
            const [hourA, minuteA] = (timeA || '00:00').split(':').map(Number);
    
            const [dateB, timeB] = b.split(' ');
            const [dayB, monthB, yearB] = (dateB === '--' ? '00/00/0000' : dateB).split('/').map(Number);
            const [hourB, minuteB] = (timeB || '00:00').split(':').map(Number);
    
            const date1 = new Date(yearA, monthA, dayA, hourA, minuteA);
            const date2 = new Date(yearB, monthB, dayB, hourB, minuteB);
    
            if (sort_type === 'Ascending') {
                return date1 - date2;
            } else if (sort_type === 'Descending') {
                return date2 - date1;
            }
        });
    }

    async sortArrayPriority(priority_list, sort_type) {
        var priority = ['Low', 'Medium', 'High', 'Highest'];

        //save index for each priority
        var priorityMap = {};
        priority.forEach(async function (value, index) {
            priorityMap[value] = index;
        });

        // Copy the original array
        var sorted_list = priority_list.slice();

        switch (sort_type) {
            case 'Ascending':
                sorted_list.sort(function (a, b) {
                    var priorityA = priorityMap[a];
                    var priorityB = priorityMap[b];
                    return priorityA - priorityB;
                });
                return sorted_list;
            case 'Descending':
                sorted_list.sort(function (a, b) {
                    var priorityA = priorityMap[a];
                    var priorityB = priorityMap[b];
                    return priorityB - priorityA;
                });
                return sorted_list;
        }
    }
}

module.exports = new StringUtil()
