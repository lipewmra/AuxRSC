import React, { useState, useRef, useEffect } from 'react';
import { UserProfile, RSCLevel, NivelClassificacao, TitulacaoAtual } from '../types';
import { RSC_REQUIREMENTS } from '../data/rscStructure';
import { PCCTAE_POSITIONS, PCCTAEPosition, getPCCTAEDescription } from '../data/pcctaePositions';
import { User, Award, Building2, Calendar, FileText, ArrowRight, Info, Search, Check, ChevronDown, Briefcase, Copy, RefreshCw, X } from 'lucide-react';
import { RscTableReference } from './RscTableReference';

interface ProfileFormProps {
  userProfile: UserProfile;
  onChangeProfile: (profile: UserProfile) => void;
  onNextStep: () => void;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({
  userProfile,
  onChangeProfile,
  onNextStep,
}) => {
  const [showCargoDropdown, setShowCargoDropdown] = useState(false);
  const [levelFilter, setLevelFilter] = useState<'TODOS' | 'E' | 'D' | 'C' | 'B' | 'A' | 'EBTT'>('TODOS');
  const [copied, setCopied] = useState(false);
  const cargoDropdownRef = useRef<HTMLDivElement>(null);

  // Close cargo dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cargoDropdownRef.current && !cargoDropdownRef.current.contains(event.target as Node)) {
        setShowCargoDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChangeProfile({
      ...userProfile,
      [name]: value,
    });
  };

  const handleFetchDescription = () => {
    const desc = getPCCTAEDescription(userProfile.cargo, userProfile.nivelClassificacao);
    onChangeProfile({
      ...userProfile,
      observacoes: desc,
    });
  };

  const handleCopyDescription = async () => {
    if (!userProfile.observacoes) return;
    try {
      await navigator.clipboard.writeText(userProfile.observacoes);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar texto:', err);
    }
  };

  const handleSelectCargo = (pos: PCCTAEPosition) => {
    const desc = getPCCTAEDescription(pos.name, pos.nivel);
    const updatedProfile: UserProfile = {
      ...userProfile,
      cargo: pos.name,
      // Auto-populate description if empty or if user wants default
      observacoes: userProfile.observacoes.trim() === '' ? desc : userProfile.observacoes,
    };
    // Auto-set nivelClassificacao if it matches E, D, C or EBTT
    if (['E', 'D', 'C', 'EBTT'].includes(pos.nivel)) {
      updatedProfile.nivelClassificacao = pos.nivel as NivelClassificacao;
    }
    onChangeProfile(updatedProfile);
    setShowCargoDropdown(false);
  };

  const handleSelectLevel = (level: RSCLevel) => {
    onChangeProfile({
      ...userProfile,
      rscAlmejado: level,
    });
  };

  const selectedReq = RSC_REQUIREMENTS[userProfile.rscAlmejado];

  // Filter positions based on input and level filter
  const cargoSearchText = (userProfile.cargo || '').trim().toLowerCase();
  const isExactSelectedMatch = PCCTAE_POSITIONS.some((p) => p.name.toLowerCase() === cargoSearchText);

  const filteredPositions = PCCTAE_POSITIONS.filter((pos) => {
    // Level filter check
    if (levelFilter !== 'TODOS' && pos.nivel !== levelFilter) {
      return false;
    }
    // Search text check
    if (!cargoSearchText) return true;
    // If the input currently equals a full exact match and the dropdown is open, show all in that level unless user is actively typing
    if (isExactSelectedMatch) return true;
    return pos.name.toLowerCase().includes(cargoSearchText);
  });

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 md:p-8">
        <div className="mb-6 pb-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <User className="h-5 w-5 text-[#0B1D3A]" />
              Dados Pessoais e Perfil Funcional para a Calculadora RSC
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Informe os dados cadastrais e o nível RSC desejado. Todas as sugestões de pontuação e textos justificativos serão personalizados para o seu perfil funcional.
            </p>
          </div>
          
          {/* RSC Target Card */}
          <div className="bg-[#FEF0B2]/60 border-2 border-[#EAA816] rounded-xl p-3.5 text-xs shrink-0 max-w-xs shadow-2xs">
            <div className="flex items-center space-x-2 text-[#132247] font-semibold mb-1">
              <Award className="h-4 w-4 text-[#132247]" />
              <span>Nível Selecionado: <strong className="text-[#C28600]">{userProfile.rscAlmejado}</strong></span>
            </div>
            <p className="text-slate-700 text-[11px] leading-relaxed">
              {selectedReq?.escolaridade} — {selectedReq?.equivalence}
            </p>
            <div className="mt-2 pt-2 border-t border-[#EAA816]/40 flex items-center justify-between text-[11px] font-medium text-[#132247]">
              <span>Pontuação Mínima:</span>
              <span className="bg-[#132247] text-[#EAA816] border border-[#EAA816] px-2 py-0.5 rounded-md font-bold">
                {selectedReq?.minTotalScore} pontos
              </span>
            </div>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onNextStep();
          }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Nome Completo */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="block text-xs font-semibold text-slate-700">
                Nome Completo do Servidor <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="nomeCompleto"
                value={userProfile.nomeCompleto}
                onChange={handleChange}
                required
                placeholder="Ex: Maria da Silva Souza"
                className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              />
            </div>

            {/* Cargo / Função (Autocomplete com busca nos cargos do PCCTAE) */}
            <div className="space-y-1.5 md:col-span-2 lg:col-span-2 relative" ref={cargoDropdownRef}>
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-slate-700">
                  Cargo / Função <span className="text-rose-500">*</span>
                </label>
                <span className="text-[10px] font-medium" style={{ color: '#002d85' }}>
                  {PCCTAE_POSITIONS.length} cargos oficiais do PCCTAE
                </span>
              </div>

              <div className="relative">
                <input
                  type="text"
                  name="cargo"
                  value={userProfile.cargo}
                  onChange={(e) => {
                    handleChange(e);
                    setShowCargoDropdown(true);
                  }}
                  onFocus={() => setShowCargoDropdown(true)}
                  required
                  placeholder="Digite para buscar seu cargo no PCCTAE (ex: Assistente, Analista, Técnico...)"
                  className="w-full pl-3.5 pr-14 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-medium"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                  {userProfile.cargo && (
                    <button
                      type="button"
                      onClick={() => {
                        onChangeProfile({ ...userProfile, cargo: '' });
                        setShowCargoDropdown(true);
                      }}
                      className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                      title="Limpar busca"
                      tabIndex={-1}
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowCargoDropdown(!showCargoDropdown)}
                    className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                    tabIndex={-1}
                  >
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform ${showCargoDropdown ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Dropdown de sugestões do PCCTAE com filtro por nível */}
              {showCargoDropdown && (
                <div className="absolute z-30 left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-xl max-h-80 overflow-y-auto divide-y divide-slate-100">
                  {/* Header e Filtros por Nível */}
                  <div className="p-2 bg-slate-50 sticky top-0 border-b border-slate-200 space-y-1.5 z-10">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                      <span>Base de Cargos PCCTAE ({filteredPositions.length} de {PCCTAE_POSITIONS.length})</span>
                      <span className="text-[9px] font-normal text-slate-400">Clique para escolher</span>
                    </div>

                    {/* Level Filter Tabs */}
                    <div className="flex items-center gap-1 flex-wrap text-[10px]">
                      {(['TODOS', 'E', 'D', 'C', 'B', 'A', 'EBTT'] as const).map((lvl) => {
                        const isActive = levelFilter === lvl;
                        return (
                          <button
                            key={lvl}
                            type="button"
                            onClick={() => setLevelFilter(lvl)}
                            className={`px-2 py-0.5 rounded-md font-bold transition cursor-pointer ${
                              isActive
                                ? 'bg-[#002d85] text-white shadow-2xs'
                                : 'bg-slate-200/70 text-slate-700 hover:bg-slate-300'
                            }`}
                          >
                            {lvl === 'TODOS' ? 'Todos' : lvl === 'EBTT' ? 'EBTT' : `Nível ${lvl}`}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {filteredPositions.length === 0 ? (
                    <div className="p-4 text-xs text-slate-500 text-center">
                      Nenhum cargo localizado com &quot;{userProfile.cargo}&quot;{levelFilter !== 'TODOS' ? ` no Nível ${levelFilter}` : ''}.
                      <br />
                      <span className="text-[11px] text-slate-400 mt-1 block">
                        Você pode manter a descrição personalizada digitada se seu cargo for específico.
                      </span>
                    </div>
                  ) : (
                    filteredPositions.map((pos) => {
                      const isSelected = userProfile.cargo === pos.name;
                      return (
                        <button
                          key={`${pos.name}-${pos.nivel}`}
                          type="button"
                          onClick={() => handleSelectCargo(pos)}
                          className={`w-full text-left px-3.5 py-2.5 text-xs hover:bg-indigo-50 transition flex items-center justify-between group cursor-pointer ${
                            isSelected ? 'bg-indigo-50/90 font-bold text-indigo-900' : 'text-slate-800'
                          }`}
                        >
                          <div className="flex items-center space-x-2 min-w-0 pr-2">
                            <Briefcase className="h-3.5 w-3.5 text-indigo-600 shrink-0" />
                            <span className="truncate font-medium text-slate-900 group-hover:text-indigo-900">
                              {pos.name}
                            </span>
                          </div>

                          <div className="flex items-center space-x-2 shrink-0">
                            <span
                              className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                                pos.nivel === 'E'
                                  ? 'bg-purple-100 text-purple-800 border border-purple-200'
                                  : pos.nivel === 'D'
                                  ? 'bg-blue-100 text-blue-800 border border-blue-200'
                                  : pos.nivel === 'C'
                                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                  : pos.nivel === 'B' || pos.nivel === 'A'
                                  ? 'bg-amber-100 text-amber-800 border border-amber-200'
                                  : 'bg-rose-100 text-rose-800 border border-rose-200'
                              }`}
                            >
                              {pos.nivel === 'EBTT' ? 'Docente EBTT' : `Nível ${pos.nivel}`}
                            </span>
                            {isSelected && <Check className="h-3.5 w-3.5 text-indigo-600" />}
                          </div>
                        </button>
                      );
                    })
                  )}
                </div>
              )}
            </div>

            {/* RSC Almejado */}
            <div className="space-y-1.5 md:col-span-1">
              <label className="block text-xs font-semibold text-slate-700">
                RSC Almejado <span className="text-rose-500">*</span>
              </label>
              <select
                name="rscAlmejado"
                value={userProfile.rscAlmejado}
                onChange={handleChange}
                style={{ color: '#150ccf' }}
                className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white font-semibold"
              >
                <option value="RSC-PCCTAE I">RSC-PCCTAE I — Fundamental Incompleto (Min: 10 pts | IQ: 10%)</option>
                <option value="RSC-PCCTAE II">RSC-PCCTAE II — Fundamental Concluído (Min: 15 pts | 2 Crit. | IQ: 15%)</option>
                <option value="RSC-PCCTAE III">RSC-PCCTAE III — Médio / Técnico (Min: 25 pts | 2 Crit. | IQ: 25%)</option>
                <option value="RSC-PCCTAE IV">RSC-PCCTAE IV — Graduação (Min: 30 pts | 3 Crit. | IQ: 30%)</option>
                <option value="RSC-PCCTAE V">RSC-PCCTAE V — Pós-Graduação Lato Sensu (Min: 52 pts | 5 Crit. | IQ: 52%)</option>
                <option value="RSC-PCCTAE VI">RSC-PCCTAE VI — Mestrado (Min: 75 pts | 7 Crit. | IQ: 75%)</option>
              </select>
            </div>

            {/* Matrícula SIAPE */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">Matrícula SIAPE</label>
              <input
                type="text"
                name="siape"
                value={userProfile.siape}
                onChange={handleChange}
                placeholder="Ex: 1234567"
                className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Nível de Classificação */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">Nível do Cargo (PCCTAE/EBTT)</label>
              <select
                name="nivelClassificacao"
                value={userProfile.nivelClassificacao}
                onChange={handleChange}
                className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
              >
                <option value="E">Nível E (Superior)</option>
                <option value="D">Nível D (Médio/Técnico)</option>
                <option value="C">Nível C (Auxiliar)</option>
                <option value="EBTT">Carreira EBTT (Docente)</option>
              </select>
            </div>

            {/* Lotação / UFCG */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">Lotação / Unidade (UFCG)</label>
              <input
                type="text"
                name="lotacao"
                value={userProfile.lotacao}
                onChange={handleChange}
                placeholder="Ex: Secretaria de Recursos Humanos - SRH / UFCG"
                className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Titulação Atual */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">Escolaridade / Titulação Acadêmica Atual</label>
              <select
                name="titulacaoAtual"
                value={userProfile.titulacaoAtual}
                onChange={handleChange}
                className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
              >
                <option value="fundamental_incompleto">Ensino Fundamental não concluído</option>
                <option value="fundamental_completo">Ensino Fundamental concluído</option>
                <option value="medio_tecnico">Ensino Médio ou Curso Técnico</option>
                <option value="graduacao">Graduação</option>
                <option value="especializacao">Pós-Graduação Lato Sensu (Especialização)</option>
                <option value="mestrado">Mestrado (Stricto Sensu)</option>
              </select>
            </div>
          </div>

          {/* Descrição Geral do Cargo PCCTAE / Particularidades Funcionais */}
          <div className="space-y-2 bg-slate-50/80 border border-slate-200 rounded-xl p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1 border-b border-slate-200/60">
              <div>
                <label className="block text-xs font-bold text-[#132247] flex items-center gap-1.5">
                  <FileText className="h-4 w-4 text-[#132247]" />
                  Descrição Geral do Cargo PCCTAE e Atribuições da Função
                </label>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Busque e carregue a descrição oficial das atribuições do cargo informado ({userProfile.cargo || 'Nenhum cargo informado'}). Você pode copiar ou editar o texto livremente.
                </p>
              </div>

              {/* Action Buttons: Search PCCTAE & Copy */}
              <div className="flex items-center gap-1.5 shrink-0 flex-wrap">
                <button
                  type="button"
                  onClick={handleFetchDescription}
                  className="px-3 py-1.5 text-xs font-bold text-white bg-[#132247] hover:bg-[#1C3366] border border-[#EAA816] rounded-lg transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  title="Buscar e carregar a descrição geral oficial deste cargo no PCCTAE"
                >
                  <Search className="h-3.5 w-3.5 text-[#EAA816]" />
                  <span>Buscar Descrição PCCTAE</span>
                </button>

                {userProfile.observacoes && (
                  <button
                    type="button"
                    onClick={handleCopyDescription}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition flex items-center gap-1.5 cursor-pointer shadow-2xs ${
                      copied
                        ? 'bg-emerald-600 text-white border-emerald-600 font-bold'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                    title="Copiar texto para a área de transferência"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-white" />
                        <span>Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 text-slate-600" />
                        <span>Copiar Texto</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            <div className="relative pt-1">
              <textarea
                name="observacoes"
                rows={5}
                value={userProfile.observacoes}
                onChange={handleChange}
                placeholder="Clique no botão 'Buscar Descrição PCCTAE' para carregar automaticamente as atribuições oficiais do seu cargo ou digite e edite o texto com suas particularidades funcionais..."
                className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white leading-relaxed font-sans"
              />
            </div>

            <div className="flex items-center justify-between text-[10px] text-slate-500 pt-0.5">
              <span className="inline-flex items-center gap-1 text-slate-600">
                💡 <strong>Dica:</strong> Copie ou edite o texto para acrescentar números de portarias de chefia, projetos de extensão e atuações específicas na sua unidade.
              </span>
              <span className="font-mono text-slate-400 shrink-0 ml-2">
                {userProfile.observacoes ? userProfile.observacoes.length : 0} caracteres
              </span>
            </div>
          </div>

          {/* Legal notice box */}
          <div className="p-3.5 bg-[#FEF0B2]/70 border-2 border-[#EAA816] rounded-xl text-[#132247] text-xs flex items-start space-x-2.5 shadow-2xs">
            <Info className="h-4 w-4 text-[#132247] shrink-0 mt-0.5" />
            <div className="text-[11px] leading-relaxed">
              <span className="font-bold text-[#C28600]">Aviso Importante sobre o RSC PCCTAE:</span> Para que a pontuação seja válida perante a Comissão Especial de Avaliação (Resoluções Oficiais e Lei 15.367/2026), todos os documentos anexados na etapa seguinte deverão conter número de portaria/declaração oficial, carga horária descrita e atesto de efetivo exercício ou conclusão.
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#132247] hover:bg-[#1C3366] text-white border-2 border-[#EAA816] font-semibold rounded-xl text-xs shadow-sm hover:shadow transition flex items-center space-x-2 cursor-pointer"
            >
              <span className="text-white font-bold">Avançar para Envio de PDFs</span>
              <ArrowRight className="h-4 w-4 text-[#EAA816]" />
            </button>
          </div>
        </form>
      </div>

      {/* Official RSC Table Component */}
      <RscTableReference
        selectedLevel={userProfile.rscAlmejado}
        onSelectLevel={handleSelectLevel}
      />
    </div>
  );
};
