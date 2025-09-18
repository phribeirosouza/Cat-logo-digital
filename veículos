import React, { useState } from 'react';

// Tipos para os dados
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

// Dados mock de veículos
const mockVehicles: Vehicle[] = [
  {
    id: 1,
    name: "Fiat Argo",
    year: 2022,
    color: "Vermelho",
    bodyType: "hatch",
    coverImage: "https://placeholder-image-service.onrender.com/image/400x300?prompt=Fiat%20Argo%20hatch%20vermelho%202022&id=1",
    images: [
      "https://placeholder-image-service.onrender.com/image/600x400?prompt=Fiat%20Argo%20hatch%20vermelho%20frontal&id=2",
      "https://placeholder-image-service.onrender.com/image/600x400?prompt=Fiat%20Argo%20hatch%20vermelho%20traseira&id=3",
      "https://placeholder-image-service.onrender.com/image/600x400?prompt=Fiat%20Argo%20hatch%20vermelho%20interior&id=4"
    ],
    description: "Fiat Argo 2022 na cor vermelha, completo, com ar condicionado, direção hidráulica e apenas 30.000 km rodados. Conservado, único dono."
  },
  {
    id: 2,
    name: "Volkswagen Gol",
    year: 2020,
    color: "Preto",
    bodyType: "hatch",
    coverImage: "https://placeholder-image-service.onrender.com/image/400x300?prompt=Volkswagen%20Gol%20hatch%20preto%202020&id=5",
    images: [
      "https://placeholder-image-service.onrender.com/image/600x400?prompt=Volkswagen%20Gol%20hatch%20preto%20frontal&id=6",
      "https://placeholder-image-service.onrender.com/image/600x400?prompt=Volkswagen%20Gol%20hatch%20preto%20lateral&id=7"
    ],
    description: "Volkswagen Gol 2020 na cor preta, bem conservado, com documentação em dia e revisões feitas na concessionária."
  },
  {
    id: 3,
    name: "Toyota Corolla",
    year: 2021,
    color: "Branco",
    bodyType: "sedan",
    coverImage: "https://placeholder-image-service.onrender.com/image/400x300?prompt=Toyota%20Corolla%20sedan%20branco%202021&id=8",
    images: [
      "https://placeholder-image-service.onrender.com/image/600x400?prompt=Toyota%20Corolla%20sedan%20branco%20frontal&id=9",
      "https://placeholder-image-service.onrender.com/image/600x400?prompt=Toyota%20Corolla%20sedan%20branco%20interior%20luxo&id=10"
    ],
    description: "Toyota Corolla 2021 sedan na cor branca, completo com todos os opcionais, teto solar, multimídia e sensor de estacionamento."
  },
  {
    id: 4,
    name: "Honda Civic",
    year: 2019,
    color: "Prata",
    bodyType: "sedan",
    coverImage: "https://placeholder-image-service.onrender.com/image/400x300?prompt=Honda%20Civic%20sedan%20prata%202019&id=11",
    images: [
      "https://placeholder-image-service.onrender.com/image/600x400?prompt=Honda%20Civic%20sedan%20prata%20dianteira&id=12",
      "https://placeholder-image-service.onrender.com/image/600x400?prompt=Honda%20Civic%20sedan%20prata%20traseira&id=13"
    ],
    description: "Honda Civic 2019 na cor prata, com motor 1.5 flex, automático, único dono e histórico de revisões completo."
  },
  {
    id: 5,
    name: "Chevrolet Onix",
    year: 2023,
    color: "Azul",
    bodyType: "hatch",
    coverImage: "https://placeholder-image-service.onrender.com/image/400x300?prompt=Chevrolet%20Onix%20hatch%20azul%202023&id=14",
    images: [
      "https://placeholder-image-service.onrender.com/image/600x400?prompt=Chevrolet%20Onix%20hatch%20azul%20completo&id=15",
      "https://placeholder-image-service.onrender.com/image/600x400?prompt=Chevrolet%20Onix%20hatch%20azul%20interno&id=16"
    ],
    description: "Chevrolet Onix 2023 na cor azul, 0km, com garantia de fábrica e todos os acessórios originais."
  },
  {
    id: 6,
    name: "Ford Ka",
    year: 2020,
    color: "Verde",
    bodyType: "hatch",
    coverImage: "https://placeholder-image-service.onrender.com/image/400x300?prompt=Ford%20Ka%20hatch%20verde%202020&id=17",
    images: [
      "https://placeholder-image-service.onrender.com/image/600x400?prompt=Ford%20Ka%20hatch%20verde%20dianteira&id=18",
      "https://placeholder-image-service.onrender.com/image/600x400?prompt=Ford%20Ka%20hatch%20verde%20lateral&id=19"
    ],
    description: "Ford Ka 2020 na cor verde, econômico, perfeito para cidade, com baixo consumo de combustível."
  }
];

const VehicleCatalog: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>(mockVehicles);
  const [searchTerm, setSearchTerm] = useState('');
  const [yearFilter, setYearFilter] = useState<number | null>(null);
  const [colorFilter, setColorFilter] = useState<string>('');
  const [bodyTypeFilter, setBodyTypeFilter] = useState<string>('');
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

  // Filtros
  const availableYears = [...new Set(vehicles.map(v => v.year))].sort((a, b) => b - a);
  const availableColors = [...new Set(vehicles.map(v => v.color))];
  const availableBodyTypes = ['hatch', 'sedan'];

  const applyFilters = () => {
    let result = vehicles;
    
    if (searchTerm) {
      result = result.filter(vehicle => 
        vehicle.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (yearFilter) {
      result = result.filter(vehicle => vehicle.year === yearFilter);
    }
    
    if (colorFilter) {
      result = result.filter(vehicle => vehicle.color === colorFilter);
    }
    
    if (bodyTypeFilter) {
      result = result.filter(vehicle => vehicle.bodyType === bodyTypeFilter);
    }
    
    setFilteredVehicles(result);
  };

  React.useEffect(() => {
    applyFilters();
  }, [searchTerm, yearFilter, colorFilter, bodyTypeFilter, vehicles]);

  const handleLogin = () => {
    // Simulação simples de login
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
      // Editar veículo existente
      setVehicles(vehicles.map(v => 
        v.id === editingVehicle.id ? { ...newVehicle, id: editingVehicle.id } as Vehicle : v
      ));
    } else {
      // Adicionar novo veículo
      const newId = Math.max(...vehicles.map(v => v.id)) + 1;
      setVehicles([...vehicles, { ...newVehicle, id: newId } as Vehicle]);
    }

    setShowVehicleForm(false);
    setEditingVehicle(null);
  };

  const nextImage = () => {
    if (selectedVehicle) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === selectedVehicle.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedVehicle) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? selectedVehicle.images.length - 1 : prevIndex - 1
      );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-4 px-6 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Garagem Digital</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Pesquisar veículos..."
                className="px-4 py-2 rounded-lg text-foreground bg-background border border-border"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {isAdmin ? (
              <div className="flex space-x-2">
                <button 
                  onClick={handleAddVehicle}
                  className="bg-accent text-accent-foreground px-4 py-2 rounded-lg hover:bg-accent/90"
                >
                  Adicionar Veículo
                </button>
                <button 
                  onClick={handleLogout}
                  className="bg-destructive text-destructive-foreground px-4 py-2 rounded-lg hover:bg-destructive/90"
                >
                  Sair
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setShowLogin(true)}
                className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg hover:bg-secondary/90"
              >
                Admin
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Filtros */}
      <div className="bg-muted py-4 px-6">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Ano</label>
            <select
              className="w-full p-2 rounded-lg border border-border bg-background"
              value={yearFilter || ''}
              onChange={(e) => setYearFilter(e.target.value ? parseInt(e.target.value) : null)}
            >
              <option value="">Todos os anos</option>
              {availableYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Cor</label>
            <select
              className="w-full p-2 rounded-lg border border-border bg-background"
              value={colorFilter}
              onChange={(e) => setColorFilter(e.target.value)}
            >
              <option value="">Todas as cores</option>
              {availableColors.map(color => (
                <option key={color} value={color}>{color}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Carroceria</label>
            <select
              className="w-full p-2 rounded-lg border border-border bg-background"
              value={bodyTypeFilter}
              onChange={(e) => setBodyTypeFilter(e.target.value)}
            >
              <option value="">Todos os tipos</option>
              {availableBodyTypes.map(type => (
                <option key={type} value={type}>
                  {type === 'hatch' ? 'Hatch' : 'Sedan'}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchTerm('');
                setYearFilter(null);
                setColorFilter('');
                setBodyTypeFilter('');
              }}
              className="w-full bg-secondary text-secondary-foreground py-2 rounded-lg hover:bg-secondary/90"
            >
              Limpar Filtros
            </button>
          </div>
        </div>
      </div>

      {/* Grid de Veículos */}
      <main className="container mx-auto py-8 px-4">
        {filteredVehicles.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl text-muted-foreground">Nenhum veículo encontrado</h2>
            <p className="text-muted-foreground">Tente ajustar os filtros de pesquisa</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVehicles.map(vehicle => (
              <div key={vehicle.id} className="bg-card text-card-foreground rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={vehicle.coverImage}
                    alt={`${vehicle.name} ${vehicle.year} na cor ${vehicle.color}`}
                    className="w-full h-48 object-cover"
                  />
                  {isAdmin && (
                    <div className="absolute top-2 right-2 flex space-x-2">
                      <button
                        onClick={() => handleEditVehicle(vehicle)}
                        className="bg-blue-500 text-white p-1 rounded hover:bg-blue-600"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteVehicle(vehicle.id)}
                        className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{vehicle.name}</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <div>
                      <span className="font-medium">Ano:</span> {vehicle.year}
                    </div>
                    <div>
                      <span className="font-medium">Cor:</span> {vehicle.color}
                    </div>
                    <div>
                      <span className="font-medium">Tipo:</span> {vehicle.bodyType === 'hatch' ? 'Hatch' : 'Sedan'}
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedVehicle(vehicle)}
                    className="w-full mt-4 bg-primary text-primary-foreground py-2 rounded-lg hover:bg-primary/90"
                  >
                    Ver Detalhes
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal de Detalhes do Veículo */}
      {selectedVehicle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <button
                onClick={() => setSelectedVehicle(null)}
                className="absolute top-4 right-4 bg-destructive text-destructive-foreground p-2 rounded-full hover:bg-destructive/90 z-10"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* Carrossel de Imagens */}
              <div className="relative h-96">
                <img
                  src={selectedVehicle.images[currentImageIndex]}
                  alt={`Imagem ${currentImageIndex + 1} do ${selectedVehicle.name}`}
                  className="w-full h-full object-cover"
                />
                
                {selectedVehicle.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}
                
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {selectedVehicle.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full ${
                        index === currentImageIndex ? 'bg-primary' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">{selectedVehicle.name}</h2>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <h3 className="font-semibold text-muted-foreground">Ano</h3>
                    <p>{selectedVehicle.year}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-muted-foreground">Cor</h3>
                    <p>{selectedVehicle.color}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-muted-foreground">Tipo de Carroceria</h3>
                    <p>{selectedVehicle.bodyType === 'hatch' ? 'Hatch' : 'Sedan'}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-muted-foreground mb-2">Descrição</h3>
                  <p className="text-foreground">{selectedVehicle.description}</p>
                </div>
                
                <button className="w-full mt-6 bg-primary text-primary-foreground py-3 rounded-lg hover:bg-primary/90">
                  Entrar em Contato
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Login */}
      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-background rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Acesso Administrativo</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Usuário</label>
                <input
                  type="text"
                  value={adminUsername}
                  onChange={(e) => setAdminUsername(e.target.value)}
                  className="w-full p-3 rounded-lg border border-border bg-background"
                  placeholder="Digite o usuário"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Senha</label>
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full p-3 rounded-lg border border-border bg-background"
                  placeholder="Digite a senha"
                />
              </div>
              <div className="flex space-x-4 pt-4">
                <button
                  onClick={handleLogin}
                  className="flex-1 bg-primary text-primary-foreground py-3 rounded-lg hover:bg-primary/90"
                >
                  Entrar
                </button>
                <button
                  onClick={() => setShowLogin(false)}
                  className="flex-1 bg-secondary text-secondary-foreground py-3 rounded-lg hover:bg-secondary/90"
                >
                  Cancelar
                </button>
              </div>
              <p className="text-sm text-muted-foreground text-center mt-4">
                Use admin/admin123 para teste
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Formulário de Veículo */}
      {showVehicleForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-background rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">
              {editingVehicle ? 'Editar Veículo' : 'Adicionar Veículo'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Nome/Modelo *</label>
                <input
                  type="text"
                  value={newVehicle.name || ''}
                  onChange={(e) => setNewVehicle({...newVehicle, name: e.target.value})}
                  className="w-full p-3 rounded-lg border border-border bg-background"
                  placeholder="Ex: Fiat Argo"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Ano *</label>
                  <input
                    type="number"
                    value={newVehicle.year || ''}
                    onChange={(e) => setNewVehicle({...newVehicle, year: parseInt(e.target.value)})}
                    className="w-full p-3 rounded-lg border border-border bg-background"
                    placeholder="2023"
                    min="1900"
                    max="2100"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Cor *</label>
                  <input
                    type="text"
                    value={newVehicle.color || ''}
                    onChange={(e) => setNewVehicle({...newVehicle, color: e.target.value})}
                    className="w-full p-3 rounded-lg border border-border bg-background"
                    placeholder="Ex: Vermelho"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Tipo de Carroceria *</label>
                <select
                  value={newVehicle.bodyType || 'hatch'}
                  onChange={(e) => setNewVehicle({...newVehicle, bodyType: e.target.value as 'hatch' | 'sedan'})}
                  className="w-full p-3 rounded-lg border border-border bg-background"
                >
                  <option value="hatch">Hatch</option>
                  <option value="sedan">Sedan</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Imagem de Capa URL</label>
                <input
                  type="text"
                  value={newVehicle.coverImage || ''}
                  onChange={(e) => setNewVehicle({...newVehicle, coverImage: e.target.value})}
                  className="w-full p-3 rounded-lg border border-border bg-background"
                  placeholder="URL da imagem de capa"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Descrição</label>
                <textarea
                  value={newVehicle.description || ''}
                  onChange={(e) => setNewVehicle({...newVehicle, description: e.target.value})}
                  className="w-full p-3 rounded-lg border border-border bg-background min-h-[100px]"
                  placeholder="Descrição detalhada do veículo..."
                />
              </div>
              
              <div className="flex space-x-4 pt-4">
                <button
                  onClick={handleSaveVehicle}
                  className="flex-1 bg-primary text-primary-foreground py-3 rounded-lg hover:bg-primary/90"
                >
                  {editingVehicle ? 'Salvar Alterações' : 'Adicionar Veículo'}
                </button>
                <button
                  onClick={() => {
                    setShowVehicleForm(false);
                    setEditingVehicle(null);
                  }}
                  className="flex-1 bg-secondary text-secondary-foreground py-3 rounded-lg hover:bg-secondary/90"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleCatalog;
