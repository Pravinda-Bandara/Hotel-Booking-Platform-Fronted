export  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
        case 'confirmed':
            return 'text-lime-600';
        case 'pending':
            return 'text-amber-500';
        case 'cancelled':
            return 'text-red-500';
        default:
            return 'text-gray-800';
    }
};