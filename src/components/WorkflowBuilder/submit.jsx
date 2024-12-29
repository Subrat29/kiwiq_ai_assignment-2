import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectNodes, selectEdges } from '../../redux/flowSlice';
import { CheckCircle, XCircle, Loader } from 'lucide-react';

export const SubmitButton = () => {
    const nodes = useSelector(selectNodes);
    const edges = useSelector(selectEdges);
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });

    const onSubmit = async () => {
        setIsLoading(true);
        setStatus({ type: '', message: '' });

        try {
            const response = await fetch('http://127.0.0.1:8000/pipelines/parse', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nodes, edges }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            setStatus({
                type: 'success',
                message: `Nodes: ${data.num_nodes}, Edges: ${data.num_edges}, Is DAG: ${data.is_dag}`,
            });
        } catch (error) {
            console.error('Failed to parse pipeline:', error);
            setStatus({ type: 'error', message: `Failed to submit: ${error.message}` });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center space-y-4 my-4">
            <button
                type="submit"
                onClick={onSubmit}
                disabled={isLoading}
                className={`px-6 py-2 rounded-md font-semibold transition ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white shadow-md'
                    }`}
            >
                {isLoading ? <Loader className="animate-spin" size={18} /> : 'Submit'}
            </button>

            {/* Status Message */}
            {status.message && (
                <div
                    className={`flex items-center space-x-2 p-3 rounded-md text-sm ${status.type === 'success'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                        }`}
                >
                    {status.type === 'success' ? <CheckCircle size={16} /> : <XCircle size={16} />}
                    <span>{status.message}</span>
                </div>
            )}
        </div>
    );
};
