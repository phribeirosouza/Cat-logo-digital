import React, { useState, useEffect } from 'react';

interface Vehicle {
  id: number;
  name: string;
  year: number;
  color: string;
  bodyType: 'hatch' | 'sedan';
  coverImage: string;
  images: string[];
  description: string;
}

const mockVehicles: Vehicle[] = [
  {
    id: 1,
    name: "Fiat Argo",
    year: 2022,
    color: "Vermelho",
    bodyType: "hatch",
    coverImage: "https://via.placeholder.com/400x300?text=Fiat+Argo+2022",
    images: [
      "https://via.placeholder.com/600x400?text=Fiat+Argo+Frontal",
      "https://via.placeholder.com/600x400?text=Fiat+Argo+Traseira",
      "https://via.placeholder.com/600x400?text=Fiat+Argo+Interior"
    ],
    description: "Fiat Argo 2022 na cor vermelha, completo, com ar condicionado, direção hidráulica e apenas 30.000 km rodados. Conservado, único dono."
  },
  {
    id: 2,
    name: "Volkswagen Gol",
    year: 2020,
    color: "Preto",
    bodyType: "hatch",
    coverImage: "https://via.placeholder.com/400x300?text=VW+Gol+2020",
    images: [
      "https://via.placeholder.com/600x400?text=VW+Gol+Frontal",
      "https://via.placeholder.com/600x400?text=VW+Gol+Lateral"
    ],
    description: "Volkswagen Gol 2020 na cor preta, bem conservado, com documentação em dia e revisões feitas na concessionária."
  },
  {
    id: 3,
    name: "Toyota Corolla",
    year: 2021,
    color: "Branco",
    bodyType: "sedan",
    coverImage: "https://via.placeholder.com/400x300?text=Toyota+Corolla+2021",
    images: [
      "https://via.placeholder.com/600x400?text=Toyota+Corolla+Frontal",
      "https://via.placeholder.com/600x400?text=Toyota+Corolla+Interior"
    ],
    description: "Toyota Corolla 2021 sedan na cor branca, completo com todos os opcionais, teto solar, multimídia e sensor de estacionamento."
  },
  {
    id: 4,
    name: "Honda Civic",
    year: 2019,
    color: "Prata",
    bodyType: "sedan",
    coverImage: "https://via.placeholder.com/400x300?text=Honda+Civic+2019",
    images: [
      "https://via.placeholder.com/600x400?text=Honda+Civic+Dianteira",
      "https://via.placeholder.com/600x400?text=Honda+Civic+Traseira"
    ],
    description: "Honda Civic 2019 na cor prata, com motor 1.5 flex, automático, único dono e histórico de revisões completo."
  },
  {
    id: 5,
    name: "Chevrolet Onix",
    year: 2023,
    color: "Azul",
    bodyType: "hatch",
    coverImage: "https://via.placeholder.com/400x300?text=Chevrolet+Onix+2023",
    images: [
      "https://via.placeholder.com/600x400?text=Chevrolet+Onix+Completo",
      "https://via.placeholder.com/600x400?text=Chevrolet+Onix+Interno"
    ],
    description: "Chevrolet Onix 2023 na cor azul, 0km, com garantia de fábrica e todos os acessórios originais."
  },
  {
    id: 6,
    name: "Ford Ka",
    year: 2020,
    color: "Verde",
    bodyType: "hatch",
    coverImage: "https://via.placeholder.com/400x300?text=Ford+Ka+2020",
    images: [
      "https://via.placeholder.com/600x400?text=Ford+Ka+Dianteira",
      "https://via.placeholder.com/600x400?text=Ford+Ka+Lateral"
    ],
    description: "Ford Ka 2020 na cor verde, econômico, perfeito para cidade, com baixo consumo de combustível."
  }
];

const VehicleCatalog = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>(mockVehicles);
  const [searchTerm, setSearchTerm] = useState('');
  const [yearFilter, setYearFilter] = useState<string>('');
  const [colorFilter, setColorFilter] = useState('');
  const [bodyTypeFilter, setBodyTypeFilter] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [showVehicleForm, setShowVehicleForm] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [newVehicle, setNewVehicle] = useState<Partial<Vehicle>>({
    name: '',
    year: new Date().getFullYear(),
    color: '',
    bodyType: 'hatch',
    description: '',
    coverImage: '',
    images: []
  });

  // Atualiza filtro
  useEffect(() => {
    let result = vehicles;

    if (searchTerm.trim() !== '') {
      result = result.filter(v => v.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (yearFilter !== '') {
      result = result.filter(v => v.year === Number(yearFilter));
    }
    if (colorFilter !== '') {
      result = result.filter(v => v.color === colorFilter);
    }
    if (bodyTypeFilter !== '') {
      result = result.filter(v => v.bodyType === bodyTypeFilter);
    }

    setFilteredVehicles(result);
  }, [searchTerm, yearFilter, colorFilter, bodyTypeFilter, vehicles]);

  const availableYears = Array.from(new Set(vehicles.map(v => v.year))).sort((a,b) => b - a);
  const availableColors = Array.from(new Set(vehicles.map(v => v.color)));
  const availableBodyTypes = ['hatch', 'sedan'];

  const handleLogin = () => {
    if (adminUsername === 'admin' && adminPassword === 'admin123') {
      setIsAdmin(true);
      setShowLogin(false);
      setAdminUsername('');
      setAdminPassword('');
    } else {
      alert('Credenciais inválidas. Use admin/admin123 para teste.');
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
  };

  const handleAddVehicle = () => {
    setEditingVehicle(null);
    setNewVehicle({
      name: '',
      year: new Date().getFullYear(),
      color: '',
      bodyType: 'hatch',
      description: '',
      coverImage: '',
      images: []
    });
    setShowVehicleForm(true);
  };

  const handleEditVehicle = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setNewVehicle({ ...vehicle });
    setShowVehicleForm(true);
  };

  const handleDeleteVehicle = (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este veículo?')) {
      setVehicles(vehicles.filter(v => v.id !== id));
    }
  };

  const handleSaveVehicle = () => {
    if (!newVehicle.name || !newVehicle.year || !newVehicle.color || !newVehicle.bodyType) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }

    if (editingVehicle) {
      setVehicles(vehicles.map(v => v.id === editingVehicle.id ? { ...newVehicle, id: editingVehicle.id } as Vehicle : v));
    } else {
      const newId = vehicles.length > 0 ? Math.max(...vehicles.map(v => v.id)) + 1 : 1;
      setVehicles([...vehicles, { ...newVehicle, id: newId } as Vehicle]);
    }

    setShowVehicleForm(false);
    setEditingVehicle(null);
  };

  const nextImage = () => {
    if (selectedVehicle) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedVehicle.images.length);
    }
  };

  const prevImage = () => {
    if (selectedVehicle) {
      setCurrentImageIndex((prev) => (prev === 0 ? selectedVehicle.images.length - 1 : prev - 1));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-700 text-white py-4 px-6 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Garagem Digital</h1>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Pesquisar veículos..."
              className="px-4 py-2 rounded-lg text-gray-900"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            {isAdmin ? (
              <>
                <button
                  onClick={handleAddVehicle}
                  className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded"
                >
                  Adicionar Veículo
                </button>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
                >
                  Sair
                </button>
              </>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                className="bg-gray-300 text-gray-900 px-4 py-2 rounded hover:bg-gray-400"
              >
                Admin
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Filtros */}
      <section className="bg-white py-4 px-6 shadow-inner">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block mb-1 font-semibold">Ano</label>
            <select
              className="w-full p-2 border rounded"
              value={yearFilter}
              onChange={e => setYearFilter(e.target.value)}
            >
              <option value="">Todos os anos</option>
              {availableYears.map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-semibold">Cor</label>
            <select
              className="w-full p-2 border rounded"
              value={colorFilter}
              onChange={e => setColorFilter(e.target.value)}
            >
              <option value="">Todas as cores</option>
              {availableColors.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-semibold">Carroceria</label>
            <select
              className="w-full p-2 border rounded"
              value={bodyTypeFilter}
              onChange={e => setBodyTypeFilter(e.target.value)}
            >
              <option value="">Todos os tipos</option>
              {availableBodyTypes.map(bt => (
                <option key={bt} value={bt}>{bt === 'hatch' ? 'Hatch' : 'Sedan'}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchTerm('');
                setYearFilter('');
                setColorFilter('');
                setBodyTypeFilter('');
              }}
              className="w-full bg-gray-300 hover:bg-gray-400 py-2 rounded"
            >
              Limpar Filtros
            </button>
          </div>
        </div>
      </section>

      {/* Grid de veículos */}
      <main className="container mx-auto py-8 px-4">
        {filteredVehicles.length === 0 ? (
          <p className="text-center text-gray-500">Nenhum veículo encontrado.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVehicles.map(vehicle => (
              <div key={vehicle.id} className="bg-white rounded shadow hover:shadow-lg transition cursor-pointer">
                <div className="relative">
                  <img
                    src={vehicle.coverImage}
                    alt={`${vehicle.name} ${vehicle.year}`}
                    className="w-full h-48 object-cover rounded-t"
                    onClick={() => {
                      setSelectedVehicle(vehicle);
                      setCurrentImageIndex(0);
                    }}
                  />
                  {isAdmin && (
                    <div className="absolute top-2 right-2 flex space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditVehicle(vehicle);
                        }}
                        className="bg-blue-600 text-white p-1 rounded hover:bg-blue-700"
                        title="Editar"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteVehicle(vehicle.id);
                        }}
                        className="bg-red-600 text-white p-1 rounded hover:bg-red-700"
                        title="Excluir"
                      >
                        🗑️
                      </button>
                    </div>
                  )}
                </div>
                <div className="p-4" onClick={() => {
                  setSelectedVehicle(vehicle);
                  setCurrentImageIndex(0);
                }}>
                  <h3 className="font-bold text-lg">{vehicle.name}</h3>
                  <p className="text-sm text-gray-600">
                    Ano: {vehicle.year} | Cor: {vehicle.color} | {vehicle.bodyType === 'hatch' ? 'Hatch' : 'Sedan'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal Detalhes */}
      {selectedVehicle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setSelectedVehicle(null)}
              className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 text-2xl font-bold"
              aria-label="Fechar"
            >
              &times;
            </button>

            <div className="relative h-96">
              <img
                src={selectedVehicle.images[currentImageIndex]}
                alt={`${selectedVehicle.name} imagem ${currentImageIndex + 1}`}
                className="w-full h-full object-cover rounded-t"
              />
              {selectedVehicle.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
                    aria-label="Imagem anterior"
                  >
                    ‹
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
                    aria-label="Próxima imagem"
                  >
                    ›
                  </button>
                </>
              )}
            </div>

            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">{selectedVehicle.name}</h2>
              <p><strong>Ano:</strong> {selectedVehicle.year}</p>
              <p><strong>Cor:</strong> {selectedVehicle.color}</p>
              <p><strong>Tipo de Carroceria:</strong> {selectedVehicle.bodyType === 'hatch' ? 'Hatch' : 'Sedan'}</p>
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Descrição</h3>
                <p>{selectedVehicle.description}</p>
              </div>
              <button className="mt-6 w-full bg-blue-700 text-white py-3 rounded hover:bg-blue-800">
                Entrar em Contato
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Login */}
      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex
