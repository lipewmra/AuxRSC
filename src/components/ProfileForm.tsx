import React, { useState, useRef, useEffect } from 'react';
import { UserProfile, RSCLevel, NivelClassificacao, TitulacaoAtual } from '../types';
import { RSC_REQUIREMENTS } from '../data/rscStructure';
import { PCCTAE_POSITIONS, PCCTAEPosition } from '../data/pcctaePositions';
import { User, Award, Building2, Calendar, FileText, ArrowRight, Info, Search, Check, ChevronDown, Briefcase } from 'lucide-react';
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

  const handleSelectCargo = (pos: PCCTAEPosition) => {
    const updatedProfile = {
      ...userProfile,
      cargo: pos.name,
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

  // Filter positions based on input
  const filteredPositions = PCCTAE_POSITIONS.filter((pos) =>
    pos.name.toLowerCase().includes((userProfile.cargo || '').toLowerCase())
  );

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
                  className="w-full pl-3.5 pr-9 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowCargoDropdown(!showCargoDropdown)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                  tabIndex={-1}
                >
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${showCargoDropdown ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* Dropdown de sugestões do PCCTAE */}
              {showCargoDropdown && (
                <div className="absolute z-30 left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg max-h-60 overflow-y-auto divide-y divide-slate-100">
                  <div className="p-2 bg-slate-50 text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between sticky top-0 border-b border-slate-200">
                    <span>Opções Encontradas ({filteredPositions.length})</span>
                    <span className="text-[9px] font-normal text-slate-400">Clique para selecionar</span>
                  </div>

                  {filteredPositions.length === 0 ? (
                    <div className="p-3 text-xs text-slate-500 text-center">
                      Nenhum cargo específico com &quot;{userProfile.cargo}&quot;. Você pode manter a descrição personalizada digitada.
                    </div>
                  ) : (
                    filteredPositions.map((pos) => {
                      const isSelected = userProfile.cargo === pos.name;
                      return (
                        <button
                          key={pos.name}
                          type="button"
                          onClick={() => handleSelectCargo(pos)}
                          className={`w-full text-left px-3.5 py-2 text-xs hover:bg-indigo-50 transition flex items-center justify-between group cursor-pointer ${
                            isSelected ? 'bg-indigo-50/80 font-bold text-indigo-900' : 'text-slate-800'
                          }`}
                        >
                          <div className="flex items-center space-x-2 min-w-0 pr-2">
                            <Briefcase className="h-3.5 w-3.5 text-indigo-500 shrink-0" />
                            <span className="truncate font-medium text-slate-900 group-hover:text-indigo-900">
                              {pos.name}
                            </span>
                          </div>

                          <div className="flex items-center space-x-2 shrink-0">
                            <span
                              className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                                pos.nivel === 'E'
                                  ? 'bg-purple-100 text-purple-800'
                                  : pos.nivel === 'D'
                                  ? 'bg-blue-100 text-blue-800'
                                  : pos.nivel === 'C'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              Nível {pos.nivel}
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

          {/* Observações / Notas */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              Observações ou Particularidades Funcionais
            </label>
            <textarea
              name="observacoes"
              rows={2}
              value={userProfile.observacoes}
              onChange={handleChange}
              placeholder="Ex: Atuação em projetos de inovação desde 2021; Designação por portaria de chefia no período 2022-2024..."
              className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
            />
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
